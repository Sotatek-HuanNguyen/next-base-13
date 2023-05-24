// eslint-disable-next-line no-undef
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>header</section>
      <section>{children}</section>
      <section>footer</section>
    </>
  );
}
