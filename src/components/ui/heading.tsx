interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight p-1">{title}</h2>
      <p className="text-sm text-muted-foreground p-1">{description}</p>
    </div>
  );
};
