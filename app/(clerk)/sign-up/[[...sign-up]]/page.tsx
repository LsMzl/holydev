import Container from "@/components/elements/Container";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container className="max-w-[300px] mt-10">
      <SignUp />
    </Container>
  );
}
