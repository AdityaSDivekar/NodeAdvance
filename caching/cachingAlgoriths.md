## Cache Strategies

He failed the interview, so you don’t have to.

And here’s how you can answer it:

A **cache** is used to store frequently accessed data, thus serving future requests faster. Also it keeps data in memory for low latency. Yet the available memory is limited. So frequent updates to the cache are necessary.

The technique of storing, retrieving, and managing data in a cache for performance and optimal memory usage is called a **cache strategy**.

### 1. Cache Aside Strategy
[

![Cache Aside Strategy](https://substackcdn.com/image/fetch/$s_!GYjx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F114bf12a-df3b-4b2b-b10e-a58e9b22ff08_1584x335.gif "Cache Aside Strategy")

The cache aside is one of the most popular cache strategies.

It’s also called _lazy loading_ because data gets cached only when it’s queried.

Here’s how it works:

1. The app tries to read data from the cache
    
2. It then reads data from the database on a cache miss
    
3. The data gets written to the cache
    

A **cache miss** means the queried data is unavailable in the cache.

Besides the cache doesn't interact with the database directly; instead, the app does.

This strategy is easy to implement. But there’s a risk of data inconsistency and extra latency because of network round trips.

It’s used in read-heavy workloads, such as configuration data or user profiles.

Ready for the next technique?

### 2. Write Through Strategy

[

![Write Through Cache Strategy](https://substackcdn.com/image/fetch/$s_!vdiD!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa3ffb465-b245-46c0-ad0b-30535383de82_1584x335.gif "Write Through Cache Strategy")





The write-through cache strategy ensures strong consistency between the cache and the database.

Here’s how it works:

1. The app writes to the cache
    
2. The cache then writes to the database _synchronously._
    

The app doesn't interact with the database directly; instead, the cache does.

Although this strategy offers data consistency, the latency on writes is higher. Also the cache space might get wasted with infrequently accessed data.

It’s used where write rate is low, and when data freshness is critical.

### 3. Read Through Strategy

[

![Read Through Cache Strategy](https://substackcdn.com/image/fetch/$s_!E9Ho!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F05be620d-f144-4302-ab8d-ac53e48a3b90_1584x335.gif "Read Through Cache Strategy")


The read-through cache strategy installs the cache between the app and the database. This means all reads go through the cache.

Here’s how it works:

1. The app reads data from the cache
    
2. Then it reads data from the database on a cache miss
    
3. The data gets written to the cache and then returned to the app
    

The app doesn't interact with the database directly; instead, the cache does.

Although this strategy offers low latency, there’s a risk of data inconsistency.

It’s used in read-heavy workloads, such as a newsfeed or a product catalog.

Let’s keep going!

### 4. Write Back Strategy

[

![Write Back Cache Strategy](https://substackcdn.com/image/fetch/$s_!mKIn!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9267df15-d04d-45dd-9c25-56673dde00d6_1584x335.gif "Write Back Cache Strategy")



](https://substackcdn.com/image/fetch/$s_!mKIn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9267df15-d04d-45dd-9c25-56673dde00d6_1584x335.gif)

The write-back strategy writes data to the cache for batching and performance. This means write latency is low.

Here’s how it works:

1. The app writes to the cache directly
    
2. The cache then writes data to the database _asynchronously_
    

This strategy offers better write performance through batching. Yet there’s a risk of data loss if the cache fails before writing to the database.

It’s used in write-heavy workloads where throughput is more important than durability.

### 5. Write Around Strategy


[

![Write Around Cache Strategy](https://substackcdn.com/image/fetch/$s_!Mb5w!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1725533c-9acc-4581-8915-30b5ca1d981b_1584x335.gif "Write Around Cache Strategy")



](https://substackcdn.com/image/fetch/$s_!Mb5w!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1725533c-9acc-4581-8915-30b5ca1d981b_1584x335.gif)

Here’s how the write-around cache strategy works:

1. The app writes to the database
    
2. It tries to read data from the cache later
    
3. The app reads from the database on a cache miss
    
4. It then updates the cache
    

Although this strategy optimizes cache storage for frequently accessed data, there is a risk of increased latency because of cache misses.

It’s used for large data objects where updates happen rarely.

---

#### **TL;DR:**

The 2 popular cache implementations are Redis and Memcached.

- Read heavy workload: use cache aside or read through strategies
    
- Consistency vs throughput: use write-through or write-back strategies
    
- Avoid caching one-off writes: use write-around strategy
    

It’s important to pick the right cache strategy based on your needs and tradeoffs.