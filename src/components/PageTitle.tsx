import { ReactNode } from "react";

export default function PageTitle({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h1 className="mb-4 text-xl font-semibold md:text-2xl lg:text-3xl">
      {children}
    </h1>
  );
}
