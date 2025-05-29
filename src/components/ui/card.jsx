export function Card({ children }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return (
    <div className="p-6">
      {children}
    </div>
  );
}
