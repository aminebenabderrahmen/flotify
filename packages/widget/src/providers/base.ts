import type { Feedback, FeedbackProvider, SubmitResult } from '../core/types'

export abstract class BaseProvider implements FeedbackProvider {
	abstract name: string
	abstract submit(feedback: Feedback): Promise<SubmitResult>
}
