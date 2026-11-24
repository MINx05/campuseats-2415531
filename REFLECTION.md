# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
   Building a UI imperatively means tell the browser how to create the UI using DOM code. While building a UI declaratively means describe what the UI should look like and React will handles.

2. Why must a component name start with a capital letter?
   Because React can recognize it as a custom React component instead of HTML element.

3. What does a fragment <>...</> do, and why not just use a <div>?
   It allows to group multiple elements without adding extra element to the HTML. Not using <div> because it only need to group elements but not need additional container.

4. Name one benefit of splitting the UI into small components.
   Small components can be reused in different parts of the application.

# Week 6 reflection

1. Explain, step by step, what happens from the moment you click Place order until the new order appears on your Orders page. Name the functions in your own code that run, and say why you never call setOrders yourself.

Place order to OrdersPage: Once an order is written to Firestore, subscribeToMyOrders fires its callback in useMyOrders.js, which calls setOrders(data) and setLoading(false). This causing OrdersPage to re-render with the new order.
I never call setOrders myself because orders comes from useMyOrders(), and inside useMyOrders.js, Firestore's real-time listener pushes updates automatically whenever the query results change.

2. Why is orders a top-level collection, and why does each order copy vendorName and each item’s name and price instead of storing only IDs?

Keeping orders as a top-level collection lets me query across orders cleanly such as query(collection(db, "orders"), where("studentUid", "==", uid)) without nesting under each user/vendor and makes updates or deletes by orderId (changePickupTime, cancelOrder) straightforward.

Copying vendorName and each item's name and price into the order snapshot preserves what was ordered and charged at checkout time even if a vendor later renames items or changes prices and lets OrdersPage.jsx render order details without extra reads.

3. Your personal feature: which Firestore path and fields hold its data, and which line of your code reads it? Paste that line.

For personal feature, I add query and where to filter in the query itself.

Line 1-8 in vendors.js :

import {
collection,
doc,
onSnapshot,
query,
where,
writeBatch,
} from "firebase/firestore";
