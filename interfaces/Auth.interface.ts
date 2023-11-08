export interface ILoginResponse {
    token: string
    user: ICurrentUser
}

export interface ICurrentUser {
    idu:      number;
    username: string;
    name:     string;
    lastName: string;
    picture:  string;
    email:    string;
    rol:      IRol;
    state:    boolean;
    Tenat:    ITenatCurrentUser;
}

type IRol = 'ROOT' | 'ADMIN' | 'ASSISTANT' | 'STUDENT'


export interface ITenatCurrentUser {
    nit:          string;
    subdomain:    string;
    businessName: string;
    picture:      string;
}
