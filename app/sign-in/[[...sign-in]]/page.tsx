import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 to-blue-900 flex items-center justify-center flex-col relative">
            {" "}
            <h2 className="text-xl md:text-3xl my-2 font-bold text-center">Sign in to access</h2>
            <SignIn
                appearance={{
                    elements: {
                        formButtonPrimary:
                            "bg-gradient-to- from-blue-500 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl",
                    },

                    variables: {
                        colorPrimary: "blue",
                        colorTextOnPrimaryBackground: "#ffffff",
                        borderRadius: "0.5rem",
                    },
                }}
            />
            <style
                dangerouslySetInnerHTML={{
                    __html: `
            .cl-internal-b3fm6y,
            .cl-footer > div:nth-last-child(1):not([class*="Action"]),
            .cl-footer > div:has([href*="clerk"]) {
              display: none !important;
            }
          `,
                }}
            />
        </div>
    );
}
