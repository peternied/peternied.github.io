---
layout: post
title:  "Adding dependency injection"
date:   2025-01-15 13:10:00 +0500
categories: dependency-injection
author: Peter Nied
tags:
  - Testing
  - Mocks
  - Dependency Injection
---

Have you ever been in a situation where writing unit tests felt like a slog? Having trouble consistently controlling mocks? Here are some thoughts on how to escape those troubles by using dependency injection effectively.

Using mock objects to test classes offers a lot of flexibility and control for simulating specific scenarios. Mock frameworks enable you to create objects whose behaviors can be carefully controlled and verified.  For instance, consider testing an application interface over an HTTP client to ensure your error handling works. You could spin up a web server and figure out how to trigger a 500 error, but that can be complicated!  Lets mock the httpClient instead to follow the behavior we want to test.

#### Product Code

```java
public class MyClass {
   private final HttpClient httpClient;

   public MyClass(HttpClient httpClient) {
      this.httpClient = httpClient;
   }

   public boolean documentExists(String doc) {
      try {
         var response = httpClient.get(basePath + doc);
         return response.statusCode == 200;
      } catch (NotFoundException e) {
         return false;
      } catch (NetworkException ne) {
         throw new RequestFailedException(ne);
      }
   }
}
```

#### Test Code

```java
   @Mock
   HttpClient httpClient;

   MyClass myClass;

   @BeforeEach
   void beforeTest() {
      myClass = new MyClass(httpClient);
   }

   public void documentExists_isFound() {
      when(httpClient).get(any()).thenReturn(new Response(200));      // Setup 
      var result = myClass.documentExists("does-not-matter");         // Action
      assertThat(result, equalTo(true));                              // Verify
      verify(httpClient).get(any());
   }

   public void documentExists_throwsNetworkException() {
      when(httpClient).get(any()).thenThrow(new NetworkException("CustomError"));  // Setup 
      var exception = assertThrows(NetworkException.class,
         () -> myClass.documentExists("does-not-matter"));                         // Action         
      assertThat(exception.getMessage(), equalTo("CustomError"));                  // Verify
      verify(httpClient).get(any());
   }
```

By using `@BeforeEach`, we ensure each test starts with a fresh mock inside `MyClass`. These tests are structured and configured similarly. By knowing how `MyClass`  interacts with its `httpClient` allows tests to have considerable control.  When creating an instance of `MyClass` you can control its dependencies by injecting them.

Now let’s look at a situation where it gets more complex. Suppose you’re using `OpenSearchClient` to write requests against OpenSearch clusters. It handles dynamic backoff during failures, retries only certain subsets of tasks, and other advanced behaviors.

```java
   protected OpenSearchClient(ConnectionContext connectionContext) {
      this.restClient = new RestClient(connectionContext);
   }
```

Although you are injecting a prerequisite for `RestClient`, you aren’t in control of all dependencies. In this example, `ConnectionContext` holds the address and authentication information for the service under test, and you could only point to a different service under test in your test cases. How can we fix this?

#### Adding Dependency Injection

```java
   protected OpenSearchClient(ConnectionContext connectionContext) {
      this(new RestClient(connectionContext));
   }

   protected OpenSearchClient(RestClient restClient) {
      this.restClient = restClient;
   }
```

A quick way is to add another constructor for test cases that can inject all necessary resources. This works well for simple cases. But what if you have a number of static fields in use? Here’s a common scenario where we declare a retry strategy at the top of the file:

```java
   /** Retries for up to 10 minutes */
   private static final Retry BULK_RETRY_STRATEGY = Retry.backoff(BULK_MAX_RETRY_ATTEMPTS, BULK_BACKOFF)
      .maxBackoff(BULK_MAX_BACKOFF);

   private Mono<BulkResponse> sendBulkRequest(String objectPath) {
      return restClient.putAsync(objectPath, settings.toString())
         .doOnError(e -> log.error(e.getMessage()))
         .retryWhen(BULK_RETRY_STRATEGY)
         .block();
   }
```

In this example, `BULK_RETRY_STRATEGY` is effectively a dependency. If you wanted to test the `doOnError` logic in this file, you wouldn’t want your test to take 10 minutes to fail. Instead, you can create a simple injection point:

#### Adding injection point

```java
   /** Retries for up to 10 minutes */
   private static final Retry BULK_RETRY_STRATEGY = Retry.backoff(BULK_MAX_RETRY_ATTEMPTS, BULK_BACKOFF)
      .maxBackoff(BULK_MAX_BACKOFF);

   protected Retry getBulkRetryStrategy() {
      return BULK_RETRY_STRATEGY;
   }

   private Mono<BulkResponse> sendBulkRequest(String objectPath) {
      return restClient.putAsync(objectPath, settings.toString())
         .doOnError(e -> log.error(e.getMessage()))
         .retryWhen(getBulkRetryStrategy())
         .block();
   }
```

Mockito[^1] include spies, which allows you to wrap an existing object in a “spy” version of the same class, with the option to override its' behavior. In this case, you could modify the retry mechanism in a test:

```java
   import static org.mockito.Mockito.spy;

   @Mock
   RestClient restClient;

   OpenSearchClient openSearchClient;

   @BeforeEach
   void beforeTest() {
      openSearchClient = spy(new OpenSearchClient(restClient));
   }

   @Test
   public void sendBulkRequest_failedAllRetries() {
      doReturn(Retry.fixedDelay(6, Duration.ofMillis(10))).when(openSearchClient).getBulkRetryStrategy();  // Setup
      var exception = assertThrows(Exception.class,
         () -> openSearchClient.sendBulkRequest("indexName").block());                                     // Action
      assertThat(exception.getMessage(), containsString("Retries exhausted"));                             // Verification
   }
```

We’ve explored how dependency injection can make your classes more testable. By injecting dependencies (and sometimes introducing extension points like a `getBulkRetryStrategy()`), you gain control over otherwise rigid pieces of your code. This allows you to test more thoroughly without being hindered by large external setups or long-running retry strategies.

## Resources
[^1]: https://site.mockito.org/