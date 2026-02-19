"use client";

import { Button } from "@/components/ui/button";
import PageNotFound from "@/PageNotFound/PageNotFound";
import { Link } from "lucide-react";

const NotFound = () => {
  return <PageNotFound path="/">
    <div className="pt-6 border-t border-gray-200 dark:border-gray-800 w-full">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        You might be looking for:
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
          >
            todos
          </Button>
        </Link>
      </div>
    </div>
  </ PageNotFound>;
};

export default NotFound;