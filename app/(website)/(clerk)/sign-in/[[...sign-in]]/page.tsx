import Container from "@/components/elements/Container";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container className="max-w-[300px] mt-10">
      <SignIn />
    </Container>
  );
}
