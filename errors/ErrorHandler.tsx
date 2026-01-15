// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// interface IProps {
//   statusCode?: number;
//   title?: string;
// }

// const ErrorHandler = ({
//   statusCode = 500,
//   title = "Server Error",
// }: IProps) => {
//   return (
//     <>
//       <div className="flex items-center justify-center w-screen h-screen">
//         <div className="text-center">
//           <div className="inline-flex rounded-full bg-red-100 p-4">
//             <div className="rounded-full stroke-red-600 bg-red-200 p-4">
//               <svg
//                 className="w-16 h-16"
//                 viewBox="0 0 28 28"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 ></path>
//                 <path
//                   d="M17 16L22 21M22 16L17 21"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 ></path>
//               </svg>
//             </div>
//           </div>
//           <h2 className="text-2xl">
//             {statusCode} - {title}
//           </h2>
//           <h3 className="text-lg">
//             Oops something went wrong. Try to refresh this page or
//             <br />
//             feel free to contact us if the problem presists.
//           </h3>
//           <div
//             style={{ marginTop: "5px" }}
//             className="flex items-center justify-center gap-4 space-x-4 my-10"
//           >
//             <Button>
//               <Link href={"/"}>Go home</Link>
//             </Button>
//             <Button>Refresh</Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ErrorHandler;

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, RefreshCw, AlertCircle } from "lucide-react";

interface IProps {
  statusCode?: number;
  title?: string;
  message?: string;
}

const ErrorHandler = ({
  statusCode = 500,
  title = "Server Error",
  message = "Oops! Something went wrong. Try refreshing this page or feel free to contact us if the problem persists.",
}: IProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-red-100 dark:bg-red-950/30 animate-ping opacity-75"></div>

            <div className="relative inline-flex rounded-full bg-red-50 dark:bg-red-950/50 p-6 backdrop-blur-sm">
              <div className="rounded-full bg-red-100 dark:bg-red-900/50 p-5">
                <AlertCircle
                  className="w-10 h-10 md:w-16 md:h-16 text-red-600 dark:text-red-400"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-8xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            {statusCode}
          </h1>
          <div className="h-1 w-24 bg-red-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
          {title}
        </h2>

        {/* Error Message */}
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Go Home
            </Button>
          </Link>

          <Button
            onClick={handleRefresh}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
          >
            <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Refresh Page
          </Button>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Need help?{" "}
            <Link
              href="/contact"
              className="pointer-events-none text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler;
