import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Term() {
  return (
    <>
      <div className="text-white px-6 md:px-20 lg:px-40 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-black shadow-lg rounded-lg">
            <CardContent className="space-y-6 text-base leading-7 text-gray-300 p-8">
              <h3 className="text-2xl font-thin text-gray-400">Terms & Conditions</h3>
              <p>
                <span className="text-blue-500 font-semibold">Welcome to our codebase</span>. By contributing to this project, you agree to adhere to our guidelines and maintain the quality and integrity of the code. We value collaboration and appreciate your efforts in making this project better.
              </p>
              <Separator className="my-4" />
              <p>
                <span className="text-blue-500 font-semibold">Contribution Guidelines</span>: Please ensure that your code is well-documented, follows our coding standards, and includes relevant tests. Respectful communication and constructive feedback are essential for a positive collaboration experience.
              </p>
              <Separator className="my-2" />
              <p>
                <span className="text-blue-500 font-semibold">Thank you</span> for your contributions. Together, we can build something amazing and make a positive impact through our collective efforts.
              </p>
              <Separator className="my-2" />
              <h3 className="text-2xl font-thin text-gray-400">Contribute to the Project</h3>
              <div className="flex flex-col items-center text-center space-y-4">
                <input
                  className="group bg-blue-900 text-white w-full sm:w-1/2 py-3 flex items-center justify-center gap-2 rounded-md text-sm text-center font-semibold"
                  value="https://github.com/karthik-nair-20/Social-app.git"
                  disabled
                />
                {/* <input
                  className="group bg-blue-900 text-white w-full sm:w-1/2 py-3 flex items-center justify-center gap-2 rounded-md text-sm text-center font-semibold"
                  value="krthik@gamil.com"
                  disabled
                /> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
