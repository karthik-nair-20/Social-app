import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <>
      <div className="text-white px-6 md:px-20 lg:px-40 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-black shadow-lg rounded-lg">
            <CardContent className="space-y-4 text-base leading-7 text-gray-300 p-8">
            <h3 className="text-2xl font-thin text-gray-400">About Us</h3>
              <p>
                <span className="text-blue-500 font-semibold">Welcome to our social media platform</span>, where we bring people together to share moments, connect with friends, and discover new interests. Our mission is to create a vibrant community where everyone can express themselves freely and authentically.
              </p>
              <Separator className="my-4" />
              <p>
                <span className="text-blue-500 font-semibold">Our platform is designed to be user-friendly and engaging</span>, offering a seamless experience whether you're posting photos, sharing updates, or exploring content from around the world. We believe in the power of social connections and strive to make every interaction meaningful.
              </p>
              {/* <Separator className="my-2" />
              <p>
                We are committed to continuously improving our platform, incorporating the latest technologies to enhance your experience. From advanced privacy settings to innovative features, we prioritize your safety and enjoyment.
              </p> */}
              <Separator className="my-2" />
              <p>
                <span className="text-blue-500 font-semibold">Beyond just a social network</span>, we aim to be a place where creativity thrives. Whether you're an aspiring influencer, a passionate photographer, or someone who loves to stay connected, our platform provides the tools and community to support your journey.
              </p>
              <Separator className="my-2" />
              <p>
                <span className="text-blue-500 font-semibold">Join us</span> in building a positive and inclusive online space where everyone is welcome. Share your story, connect with others, and be part of a community that celebrates diversity and creativity.
              </p>
              <p className="italic text-center text-gray-400">"The best way to predict the future is to create it."
                – <span className="text-slate-500">Peter Drucker</span></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}