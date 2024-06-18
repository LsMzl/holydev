import Container from "@/components/elements/Container";
import { SignUp } from "@clerk/nextjs";


export default function RegisterPage() {
  return (
    <Container className="mt-10">
      <SignUp/>
    </Container>
  );
}
