
export type Workspace = {
    _id: string,
    name: string,
    description?: string,
    owner_id: string,
    environment: "dev" | "staging" | "prod",
    api_key: string,
}

export type Flag = {
    _id: string,
    name: string,
    description?: string,
    key: string
    workspaceId: string,
    type: "boolean" | "percentage",
    enabled: boolean,
    variations?: {
        value: boolean,
        weight: number,
    }[],
    createdAt: Date
}

export type User = {
    _id: string,
    name: string,
    email: string,
    createdAt: Date
}

export type ServerResponseType<T> = {
    success: boolean,
    message: string,
} & T

export type WorkspaceListResponse = ServerResponseType<{
    workspaces: Workspace[]
}>