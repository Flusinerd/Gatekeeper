/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	AuditLogs = "audit_logs",
	CacheConfigs = "cache_configs",
	Environments = "environments",
	FeatureFlags = "feature_flags",
	FlagEnvironmentConfigs = "flag_environment_configs",
	TargetingRules = "targeting_rules",
	Tenants = "tenants",
	UserSegmentConditions = "user_segment_conditions",
	UserSegments = "user_segments",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type AuditLogsRecord<Tdetails = unknown> = {
	action: string
	details?: null | Tdetails
	environment?: RecordIdString
	feature_flag?: RecordIdString
	id: string
	performed_at?: IsoDateString
	performed_by: string
	tenant: RecordIdString
}

export type CacheConfigsRecord = {
	created?: IsoDateString
	environment?: RecordIdString
	feature_flag?: RecordIdString
	id: string
	tenant: RecordIdString
	ttl_seconds: number
	updated?: IsoDateString
}

export type EnvironmentsRecord = {
	created?: IsoDateString
	description?: string
	id: string
	name: string
	tenant: RecordIdString
	updated?: IsoDateString
}

export enum FeatureFlagsTypeOptions {
	"boolean" = "boolean",
	"multivariate" = "multivariate",
	"percentage" = "percentage",
}
export type FeatureFlagsRecord = {
	created?: IsoDateString
	description?: string
	id: string
	is_enabled_anywhere?: boolean
	is_global_kill_switch?: boolean
	name: string
	tenant: RecordIdString
	type?: FeatureFlagsTypeOptions
	updated?: IsoDateString
}

export type FlagEnvironmentConfigsRecord<Tvalue = unknown> = {
	created?: IsoDateString
	environment: RecordIdString
	feature_flag: RecordIdString
	id: string
	is_enabled?: boolean
	percentage_rollout?: number
	schedule_end_at?: IsoDateString
	schedule_start_at?: IsoDateString
	tenant: RecordIdString
	updated?: IsoDateString
	value?: null | Tvalue
}

export enum TargetingRulesOperatorOptions {
	"equals" = "equals",
	"not_equals" = "not_equals",
	"contains" = "contains",
	"greater_than" = "greater_than",
	"less_than" = "less_than",
}
export type TargetingRulesRecord = {
	attribute_key?: string
	attribute_value?: string
	created?: IsoDateString
	flag_environment_config?: RecordIdString
	id: string
	operator?: TargetingRulesOperatorOptions
	priority?: number
	tenant: RecordIdString
	updated?: IsoDateString
	user_segment?: RecordIdString
}

export type TenantsRecord = {
	created?: IsoDateString
	description?: string
	id: string
	name: string
	updated?: IsoDateString
}

export enum UserSegmentConditionsOperatorOptions {
	"equals" = "equals",
	"not_equals" = "not_equals",
	"contains" = "contains",
	"greater_than" = "greater_than",
	"less_than" = "less_than",
}
export type UserSegmentConditionsRecord = {
	attribute_key: string
	attribute_value: string
	created?: IsoDateString
	id: string
	operator?: UserSegmentConditionsOperatorOptions
	tenant: RecordIdString
	updated?: IsoDateString
	user_segment?: RecordIdString
}

export type UserSegmentsRecord = {
	created?: IsoDateString
	description?: string
	id: string
	name: string
	tenant: RecordIdString
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type AuditLogsResponse<Tdetails = unknown, Texpand = unknown> = Required<AuditLogsRecord<Tdetails>> & BaseSystemFields<Texpand>
export type CacheConfigsResponse<Texpand = unknown> = Required<CacheConfigsRecord> & BaseSystemFields<Texpand>
export type EnvironmentsResponse<Texpand = unknown> = Required<EnvironmentsRecord> & BaseSystemFields<Texpand>
export type FeatureFlagsResponse<Texpand = unknown> = Required<FeatureFlagsRecord> & BaseSystemFields<Texpand>
export type FlagEnvironmentConfigsResponse<Tvalue = unknown, Texpand = unknown> = Required<FlagEnvironmentConfigsRecord<Tvalue>> & BaseSystemFields<Texpand>
export type TargetingRulesResponse<Texpand = unknown> = Required<TargetingRulesRecord> & BaseSystemFields<Texpand>
export type TenantsResponse<Texpand = unknown> = Required<TenantsRecord> & BaseSystemFields<Texpand>
export type UserSegmentConditionsResponse<Texpand = unknown> = Required<UserSegmentConditionsRecord> & BaseSystemFields<Texpand>
export type UserSegmentsResponse<Texpand = unknown> = Required<UserSegmentsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	audit_logs: AuditLogsRecord
	cache_configs: CacheConfigsRecord
	environments: EnvironmentsRecord
	feature_flags: FeatureFlagsRecord
	flag_environment_configs: FlagEnvironmentConfigsRecord
	targeting_rules: TargetingRulesRecord
	tenants: TenantsRecord
	user_segment_conditions: UserSegmentConditionsRecord
	user_segments: UserSegmentsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	audit_logs: AuditLogsResponse
	cache_configs: CacheConfigsResponse
	environments: EnvironmentsResponse
	feature_flags: FeatureFlagsResponse
	flag_environment_configs: FlagEnvironmentConfigsResponse
	targeting_rules: TargetingRulesResponse
	tenants: TenantsResponse
	user_segment_conditions: UserSegmentConditionsResponse
	user_segments: UserSegmentsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'audit_logs'): RecordService<AuditLogsResponse>
	collection(idOrName: 'cache_configs'): RecordService<CacheConfigsResponse>
	collection(idOrName: 'environments'): RecordService<EnvironmentsResponse>
	collection(idOrName: 'feature_flags'): RecordService<FeatureFlagsResponse>
	collection(idOrName: 'flag_environment_configs'): RecordService<FlagEnvironmentConfigsResponse>
	collection(idOrName: 'targeting_rules'): RecordService<TargetingRulesResponse>
	collection(idOrName: 'tenants'): RecordService<TenantsResponse>
	collection(idOrName: 'user_segment_conditions'): RecordService<UserSegmentConditionsResponse>
	collection(idOrName: 'user_segments'): RecordService<UserSegmentsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
