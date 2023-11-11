import { API_BASE_URL, REQ_OPTIONS } from '$config';

export const getToken = async () => {
	const r = await fetch(`${API_BASE_URL}/user/token`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export const getPublicInfo = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/${payload.user_id}/info`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export const getInfo = async () => {
	const r = await fetch(`${API_BASE_URL}/user/info`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export const getRecommendations = async () => {
	const r = await fetch(`${API_BASE_URL}/user/recommendations`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

interface UpdateInfoPayload {
	prefs?: any;
	email?: string;
	first_name?: string;
	last_name?: string;
}
export const updateInfo = async (payload: UpdateInfoPayload) => {
	const r = await fetch(`${API_BASE_URL}/user/info`, {
		...REQ_OPTIONS,
		method: 'PUT',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return !!r?.ok;
};

interface GetRecordedDayPayload {
	from: number;
	to: number;
}
export const getRecordedDays = async (payload: GetRecordedDayPayload) => {
	const params = new URLSearchParams({
		from: payload.from.toString(),
		to: payload.to.toString()
	});
	let r = await fetch(`${API_BASE_URL}/user/recorded-days?${params}`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	r = await r.text();
	if (r === '') return;
	return JSON.parse(r);
};

export const getLatestMenstrualCycleStart = async () => {
	let r = await fetch(`${API_BASE_URL}/user/recorded-days/menstrual-cycles/latest/start`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	r = await r.text();
	if (r === '') return;
	return JSON.parse(r);
};

interface GetMenstrualCyclesPayload {
	from: number;
	to: number;
}
export const getMenstrualCycles = async (payload: GetMenstrualCyclesPayload) => {
	const params = new URLSearchParams({
		from: payload.from.toString(),
		to: payload.to.toString()
	});
	let r = await fetch(`${API_BASE_URL}/user/recorded-days/menstrual-cycles?${params}`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	r = await r.text();
	if (r === '') return;
	return JSON.parse(r);
};

export const addRecordedDay = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/recorded-day`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const updateRecordedDay = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/recorded-day/${payload.recorded_day_id}`, {
		...REQ_OPTIONS,
		method: 'PUT',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const subscribeForPlan = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/subscribe`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

interface CreatePostPayload {
	parent_type: string;
	parent_id: string;
	content: string;
}
export const createPost = async (payload: CreatePostPayload) => {
	const r = await fetch(`${API_BASE_URL}/user/posts`, {
		...REQ_OPTIONS,
		method: 'POST',
		body: JSON.stringify(payload)
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const getPosts = async (payload: any) => {
	const startAfter = payload?.start_after?.length ? `&start_after=${payload.start_after}` : '';
	const q = payload?.query?.length ? `&query=${payload.query}` : '';
	const fromTo = payload?.from && payload?.to ? `&from=${payload.from}&to=${payload.to}` : '';
	const r = await fetch(
		`${API_BASE_URL}/user/posts?limit=${payload.limit}${startAfter}${fromTo}${q}`,
		{
			...REQ_OPTIONS,
			method: 'GET'
		}
	).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export const getPost = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/posts/${payload.post_id}?comments=true`, {
		...REQ_OPTIONS,
		method: 'GET'
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export const removePost = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/posts/${payload.post_id}`, {
		...REQ_OPTIONS,
		method: 'DELETE'
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const likePost = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/posts/${payload.post_id}/like`, {
		...REQ_OPTIONS,
		method: 'POST'
	}).catch((e) => e.response);
	return !!r?.ok;
};

export const updateChallenge = async (payload: any) => {
	const r = await fetch(`${API_BASE_URL}/user/challenges/${payload.challenge_id}`, {
		...REQ_OPTIONS,
		method: 'PUT',
		body: JSON.stringify({
			content: payload.content
		})
	}).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export const getChallengesHistory = async (payload: any) => {
	return [
		{
			"id": "lanl3M5lB6p5h3zmCocv",
			"user_id": "KyYG0UsYw5diNnoVcSYZbJikvhF2",
			"challenge_id": "e6NFAIGhjHdbqX4uLau5",
			"created_at": {
				"seconds": 1699280362,
				"nanoseconds": 618000000
			},
			"completed": false,
			"content": {
				"0": {
					"value": "I started the \"Track Cravings & Overcome\" challenge on Cyclo today. The first step was understanding my cravings. I realized I often crave sweet treats, and this time, I decided to opt for healthier alternatives like fruit with a sprinkle of cinnamon to satisfy my sweet tooth. It's all about making those little swaps!",
					"created_at": {
						"seconds": 1699281133,
						"nanoseconds": 898000000
					}
				},
				"1": {
					"created_at": {
						"seconds": 1699359374,
						"nanoseconds": 434000000
					},
					"value": "Hydration is key! On the second day of the challenge, I found that staying well-hydrated helped me manage my cravings. When the craving for salty snacks hit, I reached for a glass of water with a slice of lemon. It was a refreshing way to curb those salty munchies."
				},
				"2": {
					"value": "I focused on balanced meals today. I noticed that my energy levels were more stable when I ate protein-rich breakfasts. To tackle mid-morning cravings, I started my day with a protein-packed omelet, and it made a significant difference in keeping cravings at bay.",
					"created_at": {
						"seconds": 1699445495,
						"nanoseconds": 626000000
					}
				},
				"3": {
					"value": "Mindful snacking was my strategy today. I paid attention to my body's hunger cues and snacked only when I felt genuinely hungry. This helped me avoid unnecessary cravings. A handful of nuts did the trick when I needed a little pick-me-up."
				},
				"4": {
					"value": "I got creative with cooking today. I made a delicious and filling salad with a variety of veggies, chickpeas, and a light vinaigrette. It was not only satisfying but also packed with nutrients, keeping my cravings in check."
				},
				"5": {
					"created_at": {
						"seconds": 1699710006,
						"nanoseconds": 292000000
					},
					"value": "Stress often triggers cravings for me. So, I incorporated stress-relief techniques into my routine. Deep-breathing exercises helped me relax and prevented stress-related snacking. It's amazing how simple techniques can make a big difference."
				}
			},
			"updated_at": {
				"seconds": 1699710006,
				"nanoseconds": 292000000
			}
		},
		{
			"id": "lanl3M5lB6p5h3zmCocv",
			"user_id": "KyYG0UsYw5diNnoVcSYZbJikvhF2",
			"challenge_id": "e6NFAIGhjHdbqX4uLau5",
			"created_at": {
				"seconds": 1702280362,
				"nanoseconds": 618000000
			},
			"completed": false,
			"content": {
				"0": {
					"value": "I started the \"Track Cravings & Overcome\" challenge on Cyclo today. The first step was understanding my cravings. I realized I often crave sweet treats, and this time, I decided to opt for healthier alternatives like fruit with a sprinkle of cinnamon to satisfy my sweet tooth. It's all about making those little swaps!",
					"created_at": {
						"seconds": 1699281133,
						"nanoseconds": 898000000
					}
				},
				"1": {
					"created_at": {
						"seconds": 1699359374,
						"nanoseconds": 434000000
					},
					"value": "Hydration is key! On the second day of the challenge, I found that staying well-hydrated helped me manage my cravings. When the craving for salty snacks hit, I reached for a glass of water with a slice of lemon. It was a refreshing way to curb those salty munchies."
				},
				"2": {
					"value": "I focused on balanced meals today. I noticed that my energy levels were more stable when I ate protein-rich breakfasts. To tackle mid-morning cravings, I started my day with a protein-packed omelet, and it made a significant difference in keeping cravings at bay.",
					"created_at": {
						"seconds": 1699445495,
						"nanoseconds": 626000000
					}
				},
				"3": {
					"value": "Mindful snacking was my strategy today. I paid attention to my body's hunger cues and snacked only when I felt genuinely hungry. This helped me avoid unnecessary cravings. A handful of nuts did the trick when I needed a little pick-me-up."
				},
				"4": {
					"value": "I got creative with cooking today. I made a delicious and filling salad with a variety of veggies, chickpeas, and a light vinaigrette. It was not only satisfying but also packed with nutrients, keeping my cravings in check."
				},
				"5": {
					"created_at": {
						"seconds": 1699710006,
						"nanoseconds": 292000000
					},
					"value": "Stress often triggers cravings for me. So, I incorporated stress-relief techniques into my routine. Deep-breathing exercises helped me relax and prevented stress-related snacking. It's amazing how simple techniques can make a big difference."
				}
			},
			"updated_at": {
				"seconds": 1699710006,
				"nanoseconds": 292000000
			}
		},
		{
			"id": "lanl3M5lB6p5h3zmCocv",
			"user_id": "KyYG0UsYw5diNnoVcSYZbJikvhF2",
			"challenge_id": "e6NFAIGhjHdbqX4uLau5",
			"created_at": {
				"seconds": 1694180362,
				"nanoseconds": 618000000
			},
			"completed": false,
			"content": {
				"0": {
					"value": "I started the \"Track Cravings & Overcome\" challenge on Cyclo today. The first step was understanding my cravings. I realized I often crave sweet treats, and this time, I decided to opt for healthier alternatives like fruit with a sprinkle of cinnamon to satisfy my sweet tooth. It's all about making those little swaps!",
					"created_at": {
						"seconds": 1699281133,
						"nanoseconds": 898000000
					}
				},
				"1": {
					"created_at": {
						"seconds": 1699359374,
						"nanoseconds": 434000000
					},
					"value": "Hydration is key! On the second day of the challenge, I found that staying well-hydrated helped me manage my cravings. When the craving for salty snacks hit, I reached for a glass of water with a slice of lemon. It was a refreshing way to curb those salty munchies."
				},
				"2": {
					"value": "I focused on balanced meals today. I noticed that my energy levels were more stable when I ate protein-rich breakfasts. To tackle mid-morning cravings, I started my day with a protein-packed omelet, and it made a significant difference in keeping cravings at bay.",
					"created_at": {
						"seconds": 1699445495,
						"nanoseconds": 626000000
					}
				},
				"3": {
					"value": "Mindful snacking was my strategy today. I paid attention to my body's hunger cues and snacked only when I felt genuinely hungry. This helped me avoid unnecessary cravings. A handful of nuts did the trick when I needed a little pick-me-up."
				},
				"4": {
					"value": "I got creative with cooking today. I made a delicious and filling salad with a variety of veggies, chickpeas, and a light vinaigrette. It was not only satisfying but also packed with nutrients, keeping my cravings in check."
				},
				"5": {
					"created_at": {
						"seconds": 1699710006,
						"nanoseconds": 292000000
					},
					"value": "Stress often triggers cravings for me. So, I incorporated stress-relief techniques into my routine. Deep-breathing exercises helped me relax and prevented stress-related snacking. It's amazing how simple techniques can make a big difference."
				}
			},
			"updated_at": {
				"seconds": 1699710006,
				"nanoseconds": 292000000
			}
		},
		{
			"id": "lanl3M5lB6p5h3zmCocv",
			"user_id": "KyYG0UsYw5diNnoVcSYZbJikvhF2",
			"challenge_id": "e6NFAIGhjHdbqX4uLau5",
			"created_at": {
				"seconds": 1694180362,
				"nanoseconds": 618000000
			},
			"completed": false,
			"content": {
				"0": {
					"value": "I started the \"Track Cravings & Overcome\" challenge on Cyclo today. The first step was understanding my cravings. I realized I often crave sweet treats, and this time, I decided to opt for healthier alternatives like fruit with a sprinkle of cinnamon to satisfy my sweet tooth. It's all about making those little swaps!",
					"created_at": {
						"seconds": 1699281133,
						"nanoseconds": 898000000
					}
				},
				"1": {
					"created_at": {
						"seconds": 1699359374,
						"nanoseconds": 434000000
					},
					"value": "Hydration is key! On the second day of the challenge, I found that staying well-hydrated helped me manage my cravings. When the craving for salty snacks hit, I reached for a glass of water with a slice of lemon. It was a refreshing way to curb those salty munchies."
				},
				"2": {
					"value": "I focused on balanced meals today. I noticed that my energy levels were more stable when I ate protein-rich breakfasts. To tackle mid-morning cravings, I started my day with a protein-packed omelet, and it made a significant difference in keeping cravings at bay.",
					"created_at": {
						"seconds": 1699445495,
						"nanoseconds": 626000000
					}
				},
				"3": {
					"value": "Mindful snacking was my strategy today. I paid attention to my body's hunger cues and snacked only when I felt genuinely hungry. This helped me avoid unnecessary cravings. A handful of nuts did the trick when I needed a little pick-me-up."
				},
				"4": {
					"value": "I got creative with cooking today. I made a delicious and filling salad with a variety of veggies, chickpeas, and a light vinaigrette. It was not only satisfying but also packed with nutrients, keeping my cravings in check."
				},
				"5": {
					"created_at": {
						"seconds": 1699710006,
						"nanoseconds": 292000000
					},
					"value": "Stress often triggers cravings for me. So, I incorporated stress-relief techniques into my routine. Deep-breathing exercises helped me relax and prevented stress-related snacking. It's amazing how simple techniques can make a big difference."
				}
			},
			"updated_at": {
				"seconds": 1699710006,
				"nanoseconds": 292000000
			}
		},
		{
			"id": "lanl3M5lB6p5h3zmCocv",
			"user_id": "KyYG0UsYw5diNnoVcSYZbJikvhF2",
			"challenge_id": "e6NFAIGhjHdbqX4uLau5",
			"created_at": {
				"seconds": 1698280362,
				"nanoseconds": 618000000
			},
			"completed": false,
			"content": {
				"0": {
					"value": "I started the \"Track Cravings & Overcome\" challenge on Cyclo today. The first step was understanding my cravings. I realized I often crave sweet treats, and this time, I decided to opt for healthier alternatives like fruit with a sprinkle of cinnamon to satisfy my sweet tooth. It's all about making those little swaps!",
					"created_at": {
						"seconds": 1699281133,
						"nanoseconds": 898000000
					}
				},
				"1": {
					"created_at": {
						"seconds": 1699359374,
						"nanoseconds": 434000000
					},
					"value": "Hydration is key! On the second day of the challenge, I found that staying well-hydrated helped me manage my cravings. When the craving for salty snacks hit, I reached for a glass of water with a slice of lemon. It was a refreshing way to curb those salty munchies."
				},
				"2": {
					"value": "I focused on balanced meals today. I noticed that my energy levels were more stable when I ate protein-rich breakfasts. To tackle mid-morning cravings, I started my day with a protein-packed omelet, and it made a significant difference in keeping cravings at bay.",
					"created_at": {
						"seconds": 1699445495,
						"nanoseconds": 626000000
					}
				},
				"3": {
					"value": "Mindful snacking was my strategy today. I paid attention to my body's hunger cues and snacked only when I felt genuinely hungry. This helped me avoid unnecessary cravings. A handful of nuts did the trick when I needed a little pick-me-up."
				},
				"4": {
					"value": "I got creative with cooking today. I made a delicious and filling salad with a variety of veggies, chickpeas, and a light vinaigrette. It was not only satisfying but also packed with nutrients, keeping my cravings in check."
				},
				"5": {
					"created_at": {
						"seconds": 1699710006,
						"nanoseconds": 292000000
					},
					"value": "Stress often triggers cravings for me. So, I incorporated stress-relief techniques into my routine. Deep-breathing exercises helped me relax and prevented stress-related snacking. It's amazing how simple techniques can make a big difference."
				}
			},
			"updated_at": {
				"seconds": 1699710006,
				"nanoseconds": 292000000
			}
		},
		{
			"id": "lanl3M5lB6p5h3zmCocv",
			"user_id": "KyYG0UsYw5diNnoVcSYZbJikvhF2",
			"challenge_id": "e6NFAIGhjHdbqX4uLau5",
			"created_at": {
				"seconds": 1698280362,
				"nanoseconds": 618000000
			},
			"completed": false,
			"content": {
				"0": {
					"value": "I started the \"Track Cravings & Overcome\" challenge on Cyclo today. The first step was understanding my cravings. I realized I often crave sweet treats, and this time, I decided to opt for healthier alternatives like fruit with a sprinkle of cinnamon to satisfy my sweet tooth. It's all about making those little swaps!",
					"created_at": {
						"seconds": 1699281133,
						"nanoseconds": 898000000
					}
				},
				"1": {
					"created_at": {
						"seconds": 1699359374,
						"nanoseconds": 434000000
					},
					"value": "Hydration is key! On the second day of the challenge, I found that staying well-hydrated helped me manage my cravings. When the craving for salty snacks hit, I reached for a glass of water with a slice of lemon. It was a refreshing way to curb those salty munchies."
				},
				"2": {
					"value": "I focused on balanced meals today. I noticed that my energy levels were more stable when I ate protein-rich breakfasts. To tackle mid-morning cravings, I started my day with a protein-packed omelet, and it made a significant difference in keeping cravings at bay.",
					"created_at": {
						"seconds": 1699445495,
						"nanoseconds": 626000000
					}
				},
				"3": {
					"value": "Mindful snacking was my strategy today. I paid attention to my body's hunger cues and snacked only when I felt genuinely hungry. This helped me avoid unnecessary cravings. A handful of nuts did the trick when I needed a little pick-me-up."
				},
				"4": {
					"value": "I got creative with cooking today. I made a delicious and filling salad with a variety of veggies, chickpeas, and a light vinaigrette. It was not only satisfying but also packed with nutrients, keeping my cravings in check."
				},
				"5": {
					"created_at": {
						"seconds": 1699710006,
						"nanoseconds": 292000000
					},
					"value": "Stress often triggers cravings for me. So, I incorporated stress-relief techniques into my routine. Deep-breathing exercises helped me relax and prevented stress-related snacking. It's amazing how simple techniques can make a big difference."
				}
			},
			"updated_at": {
				"seconds": 1699710006,
				"nanoseconds": 292000000
			}
		},
		{
			"id": "lanl3M5lB6p5h3zmCocv",
			"user_id": "KyYG0UsYw5diNnoVcSYZbJikvhF2",
			"challenge_id": "e6NFAIGhjHdbqX4uLau5",
			"created_at": {
				"seconds": 1698280362,
				"nanoseconds": 618000000
			},
			"completed": false,
			"content": {
				"0": {
					"value": "I started the \"Track Cravings & Overcome\" challenge on Cyclo today. The first step was understanding my cravings. I realized I often crave sweet treats, and this time, I decided to opt for healthier alternatives like fruit with a sprinkle of cinnamon to satisfy my sweet tooth. It's all about making those little swaps!",
					"created_at": {
						"seconds": 1699281133,
						"nanoseconds": 898000000
					}
				},
				"1": {
					"created_at": {
						"seconds": 1699359374,
						"nanoseconds": 434000000
					},
					"value": "Hydration is key! On the second day of the challenge, I found that staying well-hydrated helped me manage my cravings. When the craving for salty snacks hit, I reached for a glass of water with a slice of lemon. It was a refreshing way to curb those salty munchies."
				},
				"2": {
					"value": "I focused on balanced meals today. I noticed that my energy levels were more stable when I ate protein-rich breakfasts. To tackle mid-morning cravings, I started my day with a protein-packed omelet, and it made a significant difference in keeping cravings at bay.",
					"created_at": {
						"seconds": 1699445495,
						"nanoseconds": 626000000
					}
				},
				"3": {
					"value": "Mindful snacking was my strategy today. I paid attention to my body's hunger cues and snacked only when I felt genuinely hungry. This helped me avoid unnecessary cravings. A handful of nuts did the trick when I needed a little pick-me-up."
				},
				"4": {
					"value": "I got creative with cooking today. I made a delicious and filling salad with a variety of veggies, chickpeas, and a light vinaigrette. It was not only satisfying but also packed with nutrients, keeping my cravings in check."
				},
				"5": {
					"created_at": {
						"seconds": 1699710006,
						"nanoseconds": 292000000
					},
					"value": "Stress often triggers cravings for me. So, I incorporated stress-relief techniques into my routine. Deep-breathing exercises helped me relax and prevented stress-related snacking. It's amazing how simple techniques can make a big difference."
				}
			},
			"updated_at": {
				"seconds": 1699710006,
				"nanoseconds": 292000000
			}
		}
	]
	const fromTo = payload?.from && payload?.to ? `&from=${payload.from}&to=${payload.to}` : '';
	const r = await fetch(
		`${API_BASE_URL}/user/challenges/history?${fromTo}`,
		{
			...REQ_OPTIONS,
			method: 'GET'
		}
	).catch((e) => e.response);
	if (!r?.ok) return;
	return r.json();
};

export default {
	getToken,
	getPublicInfo,
	getInfo,
	getRecommendations,
	updateInfo,
	getRecordedDays,
	getLatestMenstrualCycleStart,
	getMenstrualCycles,
	addRecordedDay,
	updateRecordedDay,
	subscribeForPlan,
	createPost,
	getPosts,
	getPost,
	removePost,
	likePost,
	updateChallenge,
	getChallengesHistory
};
