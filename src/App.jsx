import React, { useState, lazy, Suspense } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./style.css";

const RemoteProductListApp = lazy(
	() => import("product_list_mfe/ProductListApp"),
);

const FoodCard = lazy(() => import("shared_components/FoodCard"));
const FoodListRow = lazy(() => import("shared_components/FoodListRow"));

const App = () => {
	const [detailItems] = useState([
		{
			id: 1,
			title: "Classic Margherita Pizza",
			cuisine: "Italian",
			rating: 4.9,
			price: 1299,
			image: "https://www.holidify.com/images/cmsuploads/compressed/IndianStreetFood_20190103000803.jpg",
		},
	]);

	const [shortItems] = useState([
		{
			id: 6,
			title: "Dessert",
			image: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FybSUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
		},
	]);

	return (
		<>
			<Header />

			<h1
				style={{
					textAlign: "center",
					fontFamily: "Times New Roman, serif",
					marginTop: "20px",
				}}
			>
				Microfrontend Host Application
			</h1>

			{/* 1. SEPARATE ISOLATED SUSPENSE FOR FOOD CARDS (PORT 3001) */}
			<div style={{ padding: "20px 40px" }}>
				<Suspense fallback={<div>Loading Remote Food Cards...</div>}>
					{detailItems.map((item) => (
						<FoodCard
							key={item.id}
							image={item.image}
							title={item.title}
							price={item.price}
							cuisine={item.cuisine}
							rating={item.rating}
						/>
					))}
				</Suspense>
			</div>

			{/* 2. SEPARATE ISOLATED SUSPENSE FOR FOOD ROWS (PORT 3001) */}
			<div
				className="short-list-container"
				style={{ padding: "10px 40px" }}
			>
				<Suspense fallback={<div>Loading Remote Food Rows...</div>}>
					{shortItems.map((item) => (
						<FoodListRow
							key={item.id}
							image={item.image}
							title={item.title}
						/>
					))}
				</Suspense>
			</div>

			{/* 3. SEPARATE ISOLATED SUSPENSE FOR TODO APP (PORT 3002) */}
			<div
				className="mfe-container"
				style={{
					padding: "40px",
					borderTop: "1px dashed #ccc",
					marginTop: "20px",
				}}
			>
				<Suspense fallback={<div>Loading Remote Todo App...</div>}>
					<RemoteProductListApp />
				</Suspense>
			</div>

			<Footer />
		</>
	);
};

export default App;
