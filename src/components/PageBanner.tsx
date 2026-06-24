import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumb?: Crumb[];
}

export default function PageBanner({ title, breadcrumb }: PageBannerProps) {
  return (
    <div className="bg-[#EDE4E1] py-10 md:py-14">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-3">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-300">›</span>}
                {item.href ? (
                  <Link href={item.href} className="hover:text-[#2B5F3A] transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-700 font-medium">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
      </div>
    </div>
  );
}
