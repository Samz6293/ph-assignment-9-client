import Hero from "@/components/home/Hero";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
    return (
        <>
            <Hero />
            <FeaturedMenu />
            {/* TODO: Pizza Categories goes here */}
            <WhyChooseUs />
            <HowItWorks />
        </>
    )
}
