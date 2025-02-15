export type Result = {
    firstname: string;
    lastname: string;
    rank: string;
    bib: string;
    nation: string;
    result: string;
    time: string;
    reactionTime: number | null;
  };

  export type Startlist = {
    title: string;
    distance: number;
    members: Competitor[];
    startTime: string;
    date: string;
  };
  
  export type Competitor = {
    firstname: string;
    lastname: string;
    bib: string;
    nation: string;
    lane: string;
  };