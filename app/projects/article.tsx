import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, View } from "lucide-react";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="relative w-full h-full p-6 md:p-8">
				<div className="flex justify-between gap-2 items-center mb-4">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white">
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-zinc-500 text-xs flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>
				<h2 className="text-lg md:text-xl font-medium duration-1000 text-zinc-200 group-hover:text-white font-display mb-3">
					{project.title}
				</h2>
				<p className="text-sm md:text-base duration-1000 text-zinc-400 group-hover:text-zinc-300 leading-relaxed">
					{project.description}
				</p>
				<div className="absolute bottom-6 left-6 right-6">
					<p className="text-zinc-200 hover:text-zinc-50 text-sm">
						Read more <span aria-hidden="true">&rarr;</span>
					</p>
				</div>
			</article>
		</Link>
	);
};
