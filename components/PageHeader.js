import { Navbar, Container, Nav } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../shared/contexts/AuthContext";
import { useRouter } from "next/router";
export default function PageHeader() {
  const { logout } = useAuthContext();
  const router = useRouter();
  return (
    <div>
      <Navbar
        bg="light"
        expand="lg"
        className="shadow p-3 mb-5 bg-white rounded"
      >
        <Container>
          <Navbar.Brand href="#home">
            <Link href="/">
              <h5>TRIAL PULSE</h5>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Link href={"/sponsors"}>
                <a className="text-decoration-none fs-6 text-muted px-3">
                  Sponsors
                </a>
              </Link>

              <Link href={"/sites"}>
                <a className="text-decoration-none fs-6 text-muted px-3">
                  Sites
                </a>
              </Link>
              <Link href={"/protocols"}>
                <a className="text-decoration-none fs-6 text-muted px-3">
                  Protocols
                </a>
              </Link>
              <Link href={"/messages"}>
                <a className="text-decoration-none fs-6 text-muted px-3">
                  Messages
                </a>
              </Link>

              <a
                className="text-decoration-none fs-6 text-danger px-4 cursor-pointer"
                onClick={async () => {
                  await logout();
                  router.push("/login");
                }}
              >
                Logout
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
