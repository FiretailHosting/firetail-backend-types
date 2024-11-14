import PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Users = "users",
	Posts = "posts",
	Websites = "websites",
	AnalyticsData = "analyticsData",
	Images = "images",
	Modules = "modules",
	WebsiteModules = "websiteModules",
	PostTags = "postTags",
	SubscriptionTiers = "subscriptionTiers"
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
	firstName?: string;
	lastName?: string;
	selectedSite?: string;
	subscriptionTier?: string;
	supportTickets: number;
}
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

export type PostsRecord = {
	title: string;
	image: string;
	imageAlt: string;
	pubDate?: string;
	description: string;
	postContent: string;
	webLink: string;
	draft: boolean;
	visible: boolean;
	deleted: boolean;
	tags: string[];
}
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>


export type WebsitesRecord = {
	zoneId: string;
	name: string;
	owner: string;
	completed: boolean;
	dirty: boolean;
	projectName: string;
	rebuildCount: number;
}
export type WebsitesResponse<Texpand = unknown> = Required<WebsitesRecord> & BaseSystemFields<Texpand>

export type AnalyticsDataRecord = {
	website: string;
	totalRequests: number;
	uniqueVisitors: number;
	pageViews: number;
	date: Date;
	bytes: number;
}
export type AnalyticsDataResponse<Texpand = unknown> = Required<AnalyticsDataRecord> & BaseSystemFields<Texpand>

export type ImagesRecord = {
	file: string;
	uploader: string;
	deleted: boolean;
}

export type ImagesResponse<Texpand = unknown> = Required<ImagesRecord> & BaseSystemFields<Texpand>

export type ModulesRecord = {
	name: string;
	description: string;
	navbarName: string;
	price: number;
	paymentLink: string;
	onSale: boolean;
	onSalePrice: number;
	onSalePaymentLink: string;
	image: string;
}

export type ModulesResponse<Texpand = unknown> = Required<ModulesRecord> & BaseSystemFields<Texpand>

export type WebsiteModulesRecord = {
	module: string;
	settings: JSON;
}

export type WebsiteModulesResponse<Texpand = unknown> = Required<WebsiteModulesRecord> & BaseSystemFields<Texpand>

export type PostTagsRecord = {
	name: string;
}

export type PostTagsResponse<Texpand = unknown> = Required<PostTagsRecord> & BaseSystemFields<Texpand>

export type SubscriptionTierRecord = {
	name: string;
	price: number;
	description: string;
	supportTicketsPerMonth: number;
	websiteBuildsPerDay: number;
}

export type SubscriptionTierResponse<Texpand = unknown> = Required<SubscriptionTierRecord> & BaseSystemFields<Texpand>

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
	websites: WebsitesRecord
	analyticsData: AnalyticsDataRecord
	images: ImagesRecord
	modules: ModulesRecord
	websiteModules: WebsiteModulesRecord
	postTags: PostTagsRecord
	subscriptionTiers: SubscriptionTierRecord
}

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'posts'): RecordService<PostsResponse>
	collection(idOrName: 'websites'): RecordService<WebsitesResponse>
	collection(idOrName: 'analyticsData'): RecordService<AnalyticsDataResponse>
	collection(idOrName: 'images'): RecordService<ImagesResponse>
	collection(idOrName: 'modules'): RecordService<ModulesResponse>
	collection(idOrName: 'websiteModules'): RecordService<WebsiteModulesResponse>
	collection(idOrName: 'postTags'): RecordService<PostTagsResponse>
	collection(idOrName: 'subscriptionTiers'): RecordService<SubscriptionTierResponse>
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
