import dynamicIconImports from "lucide-react/dynamicIconImports";

import { lazy, Suspense } from "react";
import { LucideProps } from "lucide-react";

// Fallback component while the icon loads
const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

// Define props for your dynamic icon component
interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports; // This ensures the name is a valid Lucide icon name
}

const DynamicListIcon = ({ name, ...props }: IconProps) => {
  // Dynamically import the icon component
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export default DynamicListIcon;
