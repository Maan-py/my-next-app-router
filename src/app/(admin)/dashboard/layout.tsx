export default function Layout({ children, product }: { children: React.ReactNode; product: React.ReactNode }) {
  return (
    <div>
      <div className="p-5">{children}</div>
      <div className="p-5">{product}</div>
    </div>
  );
}
