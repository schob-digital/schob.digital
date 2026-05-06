import { HomePage, type HomePageProps } from './HomePage';

export default function HomeDE(props: Omit<HomePageProps, 'language'>) {
  return <HomePage {...props} language="de" />;
}
