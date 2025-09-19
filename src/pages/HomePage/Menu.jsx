import { useEffect, useState } from 'react';
import axios from 'axios';
const API_BASE = 'http://127.0.0.1:8000';
function getImageUrl(path) {
	if (!path) return '';
	return path.startsWith('http') ? path : `${API_BASE}${path}`;
}
export default function () {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const res = await axios.get(`${API_BASE}/api/products/`);
				const data = Array.isArray(res.data) ? res.data : res.data?.results ?? [];
				if (mounted) setProducts(data.slice(0, 8));
			} catch (e) {
				if (mounted) setError('Failed to load products');
			} finally {
				if (mounted) setLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	return (
		<div>
			<div>
				<div>
					<div className="space-y-4 flex flex-col justify-center items-center s p-20">
						<h1 className="text-[72px] font-bold text-black font-serif">Browse our Menu</h1>
						<p className="text-gray-500 text-[18px] sans-serif leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, <br /> elementus nibh velit enim nisi ultrices enim sed. Dictumst.</p>
					</div>
				</div>
			</div>
			{error && (
				<div className="w-[90%] mx-auto text-red-600">{error}</div>
			)}
			<div className="w-[90%] mx-auto">
				{loading ? (
					<div>Loading...</div>
				) : (
					<div className="grid grid-cols-4 gap-10 w-[90%] mx-auto ">
						{products.map((item) => (
							<div key={item.id} className="space-y-2 relative group ">
								<div className="relative overflow-hidden"><img className="w-full h-full object-cover transition-transform duration-300 ease-in-out origin-center group-hover:scale-105" src={getImageUrl(item.image)} alt={item.name} /></div>
								<div className="border absolute w-[100px] h-[40px] top-[10px] right-[10px] flex justify-center items-center border-none bg-red-500">
									<p className="text-white text-lg leading-relaxed font-semibold">${Number(item.price).toFixed(2)}</p>
								</div>
								<h1 className="text-2xl font-bold text-black font-serif">{item.name}</h1>
								<p className="text-gray-500 text-lg leading-relaxed">{item.description}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
