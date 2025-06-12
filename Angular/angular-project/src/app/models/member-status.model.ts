//Spring BootでいうDTOと同じ
export interface MemberStatusResponse{
    userId: string;
    points: number;
    rank : string;
}