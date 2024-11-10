import PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Users = "users",
	Posts = "posts",
	Websites = "websites",
	AnalyticsData = "analyticsData",
	Images = "images",
	Modules = "modules",
}

export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

export type UsersRecord = {
	avatar?: string;
	firstName: string;
	lastName: string;
	selectedSite: string;
	buildsPerDay: number;
}
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

export type PostsRecord = {
	title: string;
	pubDate?: string;
	postImg?: string;
	description: string;
	postContent: string;
	webLink: string;
	draft: boolean;
	visible: boolean;
	deleted: boolean;
}
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>


export type WebsiteRecord = {
	zoneId: string;
	name: string;
	owner: string;
	completed: boolean;
	dirty: boolean;
	projectName: string;
	rebuildCount: number;
}
export type WebsiteResponse<Texpand = unknown> = Required<WebsiteRecord> & BaseSystemFields<Texpand>

export type AnalyticsDataRecord = {
	website: string;
	totalRequests: number;
	uniqueVisitors: number;
	pageViews: number;
	date: Date;
	bytes: number;
}
export type AnalyticsDataResponse<Texpand = unknown> = Required<AnalyticsDataRecord> & BaseSystemFields<Texpand>

export type ImageRecord = {
	file: string;
	uploader: string;
}

export type ImageResponse<Texpand = unknown> = Required<ImageRecord> & BaseSystemFields<Texpand>

export type ModuleRecord = {
	name: string;
	description: string;
}

export type ModuleResponse<Texpand = unknown> = Required<ModuleRecord> & BaseSystemFields<Texpand>

export type PocketBaseError = {
    url: string;
    status: number;
    response: {
        code: number;
        message: string;
        data: any;
    }
    isAbort: boolean;
    orignalError: any;
}

export type CollectionRecords = {
	users: UsersRecord
	posts: PostsRecord
	websites: WebsiteRecord
	analyticsData: AnalyticsDataRecord
	images: ImageRecord,
	modules: ModuleRecord
}

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'posts'): RecordService<PostsResponse>
	collection(idOrName: 'websites'): RecordService<WebsiteResponse>
	collection(idOrName: 'analyticsData'): RecordService<AnalyticsDataResponse>
	collection(idOrName: 'images'): RecordService<ImageResponse>
	collection(idOrName: 'modules'): RecordService<ModuleResponse>
}

let pb: TypedPocketBase | null = null

export function initializePocketBase(apiUrl: string): void {
    if (!apiUrl) {
        throw new Error("API URL must be provided to initialize PocketBase.")
    }
    if (pb !== null) {
        return;
    }
    pb = new PocketBase(apiUrl) as TypedPocketBase
}

export function usePocketBase(): TypedPocketBase {
	if (pb === null) {
		throw new Error("PocketBase has not been initialized. Call initializePocketBase() first.")
	}
	return pb
}
