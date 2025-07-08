1. Offset & Limit Pagination
Concept: Uses offset (how many records to skip) and limit (how many records to return).

Pros: Simple, intuitive, easy to implement.

Cons: Can be inefficient for large offsets; results may shift if data changes between requests.

Example (Node.js + MongoDB):

js
// GET /api/items?offset=20&limit=10
const offset = parseInt(req.query.offset) || 0;
const limit = parseInt(req.query.limit) || 10;

const items = await Item.find().skip(offset).limit(limit);
const total = await Item.countDocuments();

res.json({
  total,
  offset,
  limit,
  data: items
});
Request:
GET /api/items?offset=20&limit=10
Returns 10 items, skipping the first 20.

2. Page-Based Pagination
Concept: Uses page and limit (or size) parameters.

Pros: User-friendly, easy to navigate pages.

Cons: Internally similar to offset/limit, so shares the same performance caveats.

Example:

js
// GET /api/items?page=3&limit=10
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const items = await Item.find().skip(skip).limit(limit);
const total = await Item.countDocuments();

res.json({
  totalPages: Math.ceil(total / limit),
  currentPage: page,
  data: items
});
Request:
GET /api/items?page=3&limit=10
Returns page 3 with 10 items per page.

3. Cursor-Based Pagination
Concept: Uses a unique value (cursor) from the last record of the previous page (e.g., an id or timestamp).

Pros: More efficient for large or changing datasets; stable results.

Cons: Harder to jump to arbitrary pages; more complex implementation.

Example:

js
// GET /api/items?cursor=60e8d6f9a5c1b2a1e0f1a2b3&limit=10
const cursor = req.query.cursor;
const limit = parseInt(req.query.limit) || 10;

let query = {};
if (cursor) {
  query._id = { $gt: cursor }; // For ascending order
}

const items = await Item.find(query).limit(limit);

res.json({
  nextCursor: items.length ? items[items.length - 1]._id : null,
  data: items
});
Request:
GET /api/items?cursor=<last_id>&limit=10
Returns 10 items after the given cursor. Use nextCursor for the next page.

4. Time-Based Pagination
Concept: Uses time fields (e.g., timestamps) to paginate data.

Pros: Useful for logs, events, or time-series data.

Cons: Only suitable when data has a clear temporal order.

Example:

js
// GET /api/events?start_time=2023-01-01T00:00:00Z&end_time=2023-01-31T23:59:59Z&limit=10
const { start_time, end_time, limit } = req.query;

const query = {
  timestamp: {
    $gte: new Date(start_time),
    $lte: new Date(end_time)
  }
};

const events = await Event.find(query).limit(parseInt(limit) || 10);

res.json({ data: events });
Request:
GET /api/events?start_time=...&end_time=...&limit=10
Fetches events within a specific time window.

5. Keyset (Seek) Pagination
Concept: Similar to cursor-based, but uses a unique, sequential field (like an auto-incrementing ID).

Pros: Fast, consistent for large datasets.

Cons: Cannot skip to arbitrary pages.

Example:


// GET /api/items?since_id=12345&limit=10
const sinceId = req.query.since_id;
const limit = parseInt(req.query.limit) || 10;

let query = {};
if (sinceId) {
  query._id = { $gt: sinceId };
}

const items = await Item.find(query).limit(limit);

res.json({
  nextSinceId: items.length ? items[items.length - 1]._id : null,
  data: items
});
Request:
GET /api/items?since_id=12345&limit=10
Returns items after the specified ID.

Summary Table
Pagination Type	          Parameters	          Pros        	Cons                   	Example Params
Offset/Limit	          offset, limit   	Simple, flexible	Slow for 
                                                              large offsets 	      offset=20&limit=10
Page-Based	             page, limit/size	 User-friendly	Same as offset/limit	  page=3&limit=10
Cursor-Based            	cursor, limit	 Fast, stable     No random access   cursor=abc123&limit=10
                                              for big data		
Time-Based          start_time, end_time	Great for       	Needs time field    	start_time=...&e                                            time-series                                  end_time=... 
Keyset/Seek	             since_id, limit	Efficient, stable	No random access	   since_id=12345&  l                                                                                          limit=10
