interface Pokemon {
  sprites: {
    front_default: string;
  };
  forms: Array<Forms>;
}

interface Forms {
  name: string;
  url: string;
}

interface Difficulty {
  id: string;
  name: string;
  amount: number;
}

interface StartupScreenProps {
  navigation: any;
}

interface GameScreenProps {
  navigation: any;
  route: any;
}

interface ScoreScreenProps {
  route: any;
  navigation: any;
}
