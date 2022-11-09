import { Container, Title } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { MainCard } from "../components/main-card/main-card";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Container>
      <MainCard />
    </Container>
  );
}
