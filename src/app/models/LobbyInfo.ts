export interface LobbyInfo {
    id: number | null;
    word: string;
    state: boolean;
    round: number;
    total_rounds: number;
    max_player: number;
    host: string;
    current_players: number;
}