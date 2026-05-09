import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function MovieList({ data }) {
	// Sort a copy of the data by vote_average (ascending)
	const sortedData = [...data].sort((a, b) => b.vote_average - a.vote_average);

	return (
		<Carousel
			opts={{
				align: "start",
			}}
			className="w-full">
			<CarouselContent>
				{sortedData.map((movie, index) => {
					return (
						<CarouselItem
							key={index}
							className="pl-1 basis-1/3 md:basis-1/5 lg:basis-1/5">
							<div className="flex items-center justify-center ">
								<MovieCard key={movie.id} movie={movie} />
							</div>
						</CarouselItem>
					);
				})}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
