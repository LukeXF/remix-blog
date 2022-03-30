import { Link, json, useLoaderData } from "remix";
import { getPosts } from "~/models/post.server";

type Post = {
	slug: string;
	title: string;
};

type LoaderData = {
	posts: Awaited<ReturnType<typeof getPosts>>;

};

export const loader = async () => {
	return json<LoaderData>({
		posts: await getPosts(),
	});
};

export default function Posts() {
	const { posts } = useLoaderData() as LoaderData;
	console.log(posts);
	return (
		<main>
			<Link to="admin" className="text-red-600 underline">
				Admin
			</Link>
			<h1>Posts</h1>
			<ul>
				{posts.map((post: any) => (
					<li key={post.slug}>
						<Link
							to={post.slug}
							className="text-blue-600 underline"
						>
							{post.title}
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}