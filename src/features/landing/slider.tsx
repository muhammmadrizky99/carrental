import React from "react";
import { Carousel } from '@mantine/carousel';
import { Center, Image } from "@mantine/core";

const images = [
    'https://res.cloudinary.com/dblohw7qg/image/upload/v1727961967/itam_lvq8jv.png',
    'https://res.cloudinary.com/dblohw7qg/image/upload/v1727961954/mera_pvvltn.png',
];


export const Slider = () => {
    return (
        <Carousel withIndicators loop>
            {images.map((image) => (
                <Carousel.Slide key={image} mt="2rem">
                    <Center h={{base: 500, md: 680, xl: 900}} >
                        <Image src={image} alt="" />
                    </Center>
                </Carousel.Slide>
            ))}
        </Carousel>
    );
};


