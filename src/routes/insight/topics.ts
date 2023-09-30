const guidances = (v: string) => `/insight/guidances/${v}`;

const permission = {
	beginner: [
		'beginner_monthly',
		'professional_monthly',
		'enterprise_monthly',
		'beginner_annually',
		'professional_annually',
		'enterprise_annually'
	],
	professional: [
		'professional_monthly',
		'enterprise_monthly',
		'professional_annually',
		'enterprise_annually'
	],
	enterprise: ['enterprise_monthly', 'enterprise_annually']
};

export default [
	{
		name: 'Reproductive health',
		items: [
			{
				name: 'Vaginal discharge color guide',
				classes: 'bg-violet-300 hover:bg-violet-400',
				link: guidances('vaginal-discharge-color-guide'),
				permission: permission.beginner
			},
			{
				name: 'How to clean your vagina',
				classes: 'bg-sky-200 hover:bg-sky-300',
				link: guidances('how-to-clean-your-vagina'),
				permission: permission.beginner
			},
			{
				name: 'Early signs of pregnancy',
				classes: 'bg-orange-100 hover:bg-orange-200',
				link: guidances('early-signs-of-pregnancy'),
				permission: permission.beginner
			},
			{
				name: 'Birth control',
				classes: 'bg-green-200 hover:bg-green-300',
				link: guidances('birth-control'),
				permission: permission.beginner
			},
			{
				name: 'Spotting vs. period vs. bleeding',
				classes: 'bg-violet-200 hover:bg-violet-300',
				link: guidances('spotting-vs-period-vs-bleeding'),
				permission: permission.beginner
			},
			{
				name: 'What to do after unprotected sex',
				classes: 'bg-rose-200 hover:bg-rose-300',
				link: guidances('what-to-do-after-unprotected-sex'),
				permission: permission.beginner
			},
			{
				name: 'How to delay or stop a period',
				classes: 'bg-yellow-100 hover:bg-yellow-200',
				link: guidances('how-to-delay-or-stop-a-period'),
				permission: permission.beginner
			}
		]
	},
	{
		name: 'sex',
		items: [
			{
				name: '9 life-changing masturbation tips',
				classes: 'bg-fuchsia-300 hover:bg-fuchsia-400',
				link: guidances('9-life-changing-masturbation-tips'),
				permission: permission.beginner
			},
			{
				name: 'Mastering your orgasm',
				classes: 'bg-blue-500 hover:bg-blue-600',
				link: guidances('mastering-your-orgasm'),
				permission: permission.beginner
			},
			{
				name: '6 reasons for genital pimples',
				classes: 'bg-emerald-500 hover:bg-emerald-600',
				link: guidances('6-reasons-for-genital-pimples'),
				permission: permission.beginner
			},
			{
				name: 'Anal sex',
				classes: 'bg-orange-400 hover:bg-orange-500',
				link: guidances('anal-sex'),
				permission: permission.beginner
			},
			{
				name: 'Sex and your cycle',
				classes: 'bg-teal-400 hover:bg-teal-500',
				link: guidances('sex-and-your-cycle'),
				permission: permission.beginner
			},
			{
				name: "A sexpert's guide to great sex",
				classes: 'bg-red-400 hover:bg-red-500',
				link: guidances('a-sexperts-guide-to-great-sex'),
				permission: permission.beginner
			},
			{
				name: 'How to choose your first sex toy',
				classes: 'bg-pink-200 hover:bg-pink-300',
				link: guidances('how-to-choose-your-first-sex-toy'),
				permission: permission.beginner
			},
			{
				name: '7 period sex FAQs',
				classes: 'bg-indigo-200 hover:bg-indigo-300',
				link: guidances('7-period-sex-faqs'),
				permission: permission.beginner
			},
			{
				name: 'Does the pull-out method work?',
				classes: 'bg-violet-400 hover:bg-violet-500',
				link: guidances('does-the-pull-out-method-work'),
				permission: permission.beginner
			}
			// {
			//   "name": "Can't orgasm? This could be why"
			// }
		]
	},
	// {
	//   "name": "Your late period",
	//   "items": [
	//     {
	//       "name": "Early signs of pregnancy",
	//       "classes": "bg-orange-100 hover:bg-orange-200",
	//       "link": guidances('early-signs-of-pregnancy'),
	//     },
	//     {
	//       "name": "Late period causes that aren't pregnancy"
	//     },
	//     {
	//       "name": "Do late period remedies work?"
	//     },
	//     {
	//       "name": "Cramps but no period? Learn why"
	//     },
	//     {
	//       "name": "What counts as a late period?"
	//     }
	//   ]
	// },
	{
		name: 'Orgasms and pleasure',
		items: [
			//     {
			//       "name": "Mastering your orgasm"
			//     },
			//     {
			//       "name": "9 life-changing masturbation tips"
			//     },
			//     {
			//       "name": "Tips for great penetrative sex"
			//     },
			//     {
			//       "name": "How to have multiple orgasms"
			//     },
			{
				name: "A sexpert's guide to great sex",
				classes: 'bg-red-400 hover:bg-red-500',
				link: guidances('a-sexperts-guide-to-great-sex'),
				permission: permission.beginner
			},
			//     {
			//       "name": "Is your sex drive normal?"
			//     },
			//     {
			//       "name": "5 sex therapy secrets"
			//     },
			//     {
			//       "name": "How does squirting happen?"
			//     },
			{
				name: 'Sex and your cycle',
				classes: 'bg-teal-400 hover:bg-teal-500',
				link: guidances('sex-and-your-cycle'),
				permission: permission.beginner
			},
			//     {
			//       "name": "Your sex toy starter kit"
			//     },
			{
				name: 'Anal sex',
				classes: 'bg-orange-400 hover:bg-orange-500',
				link: guidances('anal-sex'),
				permission: permission.beginner
			}
			//     {
			//       "name": "Masturbation myths to unlearn"
			//     }
		]
	},
	// {
	//   "name": "The latest",
	//   "items": [
	//     {
	//       "name": "How to boost your sex drive"
	//     },
	//     {
	//       "name": "Always tired? Possible causes"
	//     },
	//     {
	//       "name": "Letting go during oral sex"
	//     },
	//     {
	//       "name": "My endo diagnosis took 18 years"
	//     }
	//   ]
	// },
	// {
	//   "name": "Common sex worries",
	//   "items": [
	//     {
	//       "name": "6 reasons for genital pimples"
	//     },
	//     {
	//       "name": "Do you bleed after sex? What to do"
	//     },
	//     {
	//       "name": "Burning during sex: 5 causes"
	//     },
	//     {
	//       "name": "Can't orgasm? This could be why"
	//     },
	//     {
	//       "name": "How herpes helped my sex life"
	//     },
	//     {
	//       "name": "What to do after unprotected sex",
	//       "classes": "bg-rose-200 hover:bg-rose-300",
	//       "link": guidances('what-to-do-after-unprotected-sex'),
	//     },
	//     {
	//       "name": "Why vaginismus makes sex painful"
	//     },
	//     {
	//       "name": "Low sex drive"
	//     }
	//   ]
	// },
	// {
	//   "name": "User's favorites",
	//   "items": [
	//     {
	//       "name": "Sore boobs club: What you can do"
	//     },
	//     {
	//       "name": "Late period causes that aren't pregnancy"
	//     },
	//     {
	//       "name": "Pregnancy test: How early can you get pregnant?"
	//     },
	//     {
	//       "name": "Discharge: What to look out for"
	//     },
	//     {
	//       "name": "How to initiate sex"
	//     }
	//   ]
	// },
	// {
	//   "name": "The lowdown on late periods",
	//   "items": [
	//     {
	//       "name": "Early signs of pregnancy",
	//       "classes": "bg-orange-100 hover:bg-orange-200",
	//       "link": guidances('early-signs-of-pregnancy'),
	//     },
	//     {
	//       "name": "What counts as a late period?"
	//     },
	//     {
	//       "name": "Do late period remedies work?"
	//     },
	//     {
	//       "name": "Late period causes that aren't pregnancy"
	//     }
	//   ]
	// },
	{
		name: 'Safer sex',
		items: [
			{
				name: 'Does the pull-out method work?',
				classes: 'bg-violet-400 hover:bg-violet-500',
				link: guidances('does-the-pull-out-method-work'),
				permission: permission.beginner
			}
			//     {
			//       "name": "How herpes helped my sex life"
			//     },
			//     {
			//       "name": "How to reduce your STI risk"
			//     },
			//     {
			//       "name": "Master the condom conversation"
			//     },
			//     {
			//       "name": "What's the deal with HPV?"
			//     },
			//     {
			//       "name": "What to do after unprotected sex",
			//       "classes": "bg-rose-200 hover:bg-rose-300",
			//       "link": guidances('what-to-do-after-unprotected-sex'),
			//     },
			//     {
			//       "name": "STI myths busted"
			//     },
			//     {
			//       "name": "STIs you should know"
			//     }
		]
	},
	// {
	//   "name": "Your sensual sex playlist",
	//   "items": [
	//     {
	//       "name": "Passion"
	//     },
	//     {
	//       "name": "Us"
	//     },
	//     {
	//       "name": "Touch"
	//     },
	//     {
	//       "name": "Deep"
	//     },
	//     {
	//       "name": "Closer"
	//     }
	//   ]
	// },
	// {
	//   "name": "Trending now",
	//   "items": [
	//     {
	//       "name": "How to recognize yeast infections"
	//     },
	//     {
	//       "name": "How to ease period symptoms"
	//     },
	//     {
	//       "name": "Period blood colors explained"
	//     },
	//     {
	//       "name": "Spotting vs. period vs. bleeding",
	//       "classes": "bg-violet-200 hover:bg-violet-300",
	//       "link": guidances('spotting-vs-period-vs-bleeding'),
	//     },
	//     {
	//       "name": "Discharge: What to look out for"
	//     },
	//     {
	//       "name": "6 must-knows about emergency"
	//     }
	//   ]
	// },
	// {
	//   "name": "How to make your cycle easier",
	//   "items": [
	//     {
	//       "name": "Sore boobs club: What you can do"
	//     },
	//     {
	//       "name": "Beat the bloat"
	//     },
	//     {
	//       "name": "Spotting vs. period vs. bleeding",
	//       "classes": "bg-violet-200 hover:bg-violet-300",
	//       "link": guidances('spotting-vs-period-vs-bleeding'),
	//     },
	//     {
	//       "name": "Cramp relied roadmap"
	//     },
	//     {
	//       "name": "Period poop talk"
	//     },
	//     {
	//       "name": "Nausea and your cycle"
	//     },
	//     {
	//       "name": "Fatigue and your cycle"
	//     },
	//     {
	//       "name": "Vaginal dryness explained"
	//     },
	//     {
	//       "name": "Cramps in your back?"
	//     },
	//     {
	//       "name": "Period headaches be gone"
	//     },
	//     {
	//       "name": "All things mood swings"
	//     },
	//     {
	//       "name": "Can you \"switch off\" cramps?"
	//     }
	//   ]
	// },
	{
		name: 'Boost intimacy',
		items: [
			//     {
			//       "name": "5 sex therapy secrets"
			//     },
			{
				name: 'Sex and your cycle',
				classes: 'bg-teal-400 hover:bg-teal-500',
				link: guidances('sex-and-your-cycle'),
				permission: permission.beginner
			},
			//     {
			//       "name": "How to overcome sex anxiety"
			//     },
			//     {
			//       "name": "7 non-penetrative sex ideas"
			//     },
			//     {
			//       "name": "How to enjoy sex after trauma"
			//     },
			{
				name: "A sexpert's guide to great sex",
				classes: 'bg-red-400 hover:bg-red-500',
				link: guidances('a-sexperts-guide-to-great-sex'),
				permission: permission.beginner
			}
			//     {
			//       "name": "Is your sex drive normal?"
			//     },
			//     {
			//       "name": "How I learned that fat is hot"
			//     }
		]
	},
	{
		name: "let's talk about masturbation",
		items: [
			//     {
			//       "name": "9 life-changing masturbation tips"
			//     },
			//     {
			//       "name": "Mastering your orgasm"
			//     },
			{
				name: 'How to choose your first sex toy',
				classes: 'bg-pink-200 hover:bg-pink-300',
				link: guidances('how-to-choose-your-first-sex-toy'),
				permission: permission.beginner
			}
			//     {
			//       "name": "Masturbation myths to unlearn"
			//     }
		]
	},
	{
		name: 'Live in sync with your cycle',
		items: [
			{
				name: 'Sex and your cycle',
				classes: 'bg-teal-400 hover:bg-teal-500',
				link: guidances('sex-and-your-cycle'),
				permission: permission.beginner
			}
			//     {
			//       "name": "Female health and nutrition"
			//     },
			//     {
			//       "name": "COVID vaccine and your cycle"
			//     },
			//     {
			//       "name": "Sleep and your cycle"
			//     },
			//     {
			//       "name": "How alcohol affects your cycle"
			//     },
			//     {
			//       "name": "Workouts and your cycle"
			//     }
		]
	},
	// {
	//   "name": "Pregnancy explained",
	//   "items": [
	//     {
	//       "name": "Early signs of pregnancy",
	//       "classes": "bg-orange-100 hover:bg-orange-200",
	//       "link": guidances('early-signs-of-pregnancy'),
	//     },
	//     {
	//       "name": "Getting pregnant"
	//     },
	//     {
	//       "name": "How ovulation affects you"
	//     },
	//     {
	//       "name": "Ovulation masterclass"
	//     },
	//     {
	//       "name": "Pregnancy or PMS? 8 symptoms"
	//     },
	//     {
	//       "name": "COVID vaccine fertility myths"
	//     },
	//     {
	//       "name": "Period sex pregnancy risk"
	//     }
	//   ]
	// },
	// {
	//   "name": "Flow guide",
	//   "items": [
	//     {
	//       "name": "Light period? This could be why"
	//     },
	//     {
	//       "name": "Why is your period so heavy?"
	//     },
	//     {
	//       "name": "Light, medium or heavy?"
	//     },
	//     {
	//       "name": "The future of periods uncovered"
	//     },
	//     {
	//       "name": "Period products guide"
	//     },
	//     {
	//       "name": "What's the point of periods?"
	//     },
	//     {
	//       "name": "How to avoid period leaks"
	//     },
	//     {
	//       "name": "Managing long and heavy periods"
	//     },
	//     {
	//       "name": "The truth about toxic shock syndrome"
	//     },
	//     {
	//       "name": "Period blood colors explained"
	//     },
	//     {
	//       "name": "Spotting vs. period vs. bleeding",
	//       "classes": "bg-violet-200 hover:bg-violet-300",
	//       "link": guidances('spotting-vs-period-vs-bleeding'),
	//     },
	//     {
	//       "name": "Why do periods start and stop?"
	//     },
	//     {
	//       "name": "Reusable period products"
	//     }
	//   ]
	// },
	// {
	//   "name": "Birth Control",
	//   "items": [
	//     {
	//       "name": "6 must-knows about emergency"
	//     },
	//     {
	//       "name": "Morning-after pill FAQs"
	//     },
	//     {
	//       "name": "The male pill: Where we're at"
	//     },
	//     {
	//       "name": "Master the condom conversation"
	//     },
	//     {
	//       "name": "The pill: 7-day break or not?"
	//     },
	//     {
	//       "name": "Copying with pregnancy paranoia"
	//     },
	//     {
	//       "name": "Birth Control",
	//       "classes": "bg-green-200 hover:bg-green-300",
	//       "link": guidances('birth-control'),
	//     }
	//   ]
	// },
	{
		name: 'Ideas to try',
		items: [
			//     {
			//       "name": "Your sex toy starter kit"
			//     },
			{
				name: 'How to choose your first sex toy',
				classes: 'bg-pink-200 hover:bg-pink-300',
				link: guidances('how-to-choose-your-first-sex-toy'),
				permission: permission.beginner
			},
			//     {
			//       "name": "How to have multiple orgasms"
			//     },
			//     {
			//       "name": "Lesbian sex toy guide"
			//     },
			//     {
			//       "name": "Your sensual sex playlist"
			//     },
			//     {
			//       "name": "Learn to choose and use lube"
			//     },
			{
				name: 'Anal sex',
				classes: 'bg-orange-400 hover:bg-orange-500',
				link: guidances('anal-sex'),
				permission: permission.beginner
			}
		]
	}
	// {
	//   "name": "Spot the signs of",
	//   "items": [
	//     {
	//       "name": "Bacterial vaginosis FAQs"
	//     },
	//     {
	//       "name": "How to recognize yeast infections"
	//     },
	//     {
	//       "name": "My UTI came back, what now?"
	//     },
	//     {
	//       "name": "Vaginal smell: What's normal?"
	//     },
	//     {
	//       "name": "Vaginal dryness: What you can do"
	//     },
	//     {
	//       "name": "The workout you shouldn't neglect"
	//     },
	//     {
	//       "name": "Yeast infection won't go away?"
	//     },
	//     {
	//       "name": "STIs: Spot and treat"
	//     },
	//     {
	//       "name": "PCOS or endometriosis"
	//     },
	//     {
	//       "name": "Say \"bye bye\" to UTIs"
	//     },
	//     {
	//       "name": "Discharge: What to look out for"
	//     },
	//     {
	//       "name": "OB-GYN Qs everyone's asking"
	//     }
	//   ]
	// },
	// {
	//   "name": "LGBTQ+",
	//   "items": [
	//     {
	//       "name": "Period advice for trans people"
	//     },
	//     {
	//       "name": "Lesbian sex toy guide"
	//     },
	//     {
	//       "name": "How to have safer LGBTQ+ sex"
	//     },
	//     {
	//       "name": "Coming out as LGBTQ+"
	//     },
	//     {
	//       "name": "How to become an LGBTQ+ parent"
	//     },
	//     {
	//       "name": "An LGBTQ+ guide to birth control"
	//     }
	//   ]
	// },
	// {
	//   "name": "Show PMS who's boss",
	//   "items": [
	//     {
	//       "name": "PMS action plan"
	//     },
	//     {
	//       "name": "All things mood swings"
	//     },
	//     {
	//       "name": "PMS: 5 things you should know"
	//     },
	//     {
	//       "name": "Is your bad PMS actually PMDD?"
	//     },
	//     {
	//       "name": "Beat the bload"
	//     }
	//   ]
	// },
	// {
	//   "name": "Explore course",
	//   "items": [
	//     {
	//       "name": "Finding your healthy weight"
	//     },
	//     {
	//       "name": "Stress and Anxiety: reclaim energy"
	//     },
	//     {
	//       "name": "Build your home skincare routine"
	//     },
	//     {
	//       "name": "How to stay happy as a couple"
	//     },
	//     {
	//       "name": "8 strategies against burnout"
	//     }
	//   ]
	// },
	// {
	//   "name": "Reproductive health concerns",
	//   "items": [
	//     {
	//       "name": "Living with uterine fibroids"
	//     },
	//     {
	//       "name": "Tited uterus: Need-to-knows"
	//     },
	//     {
	//       "name": "Endometriosis: Explained"
	//     },
	//     {
	//       "name": "Other conditions"
	//     },
	//     {
	//       "name": "Period pain vs. endometriosis"
	//     },
	//     {
	//       "name": "PCOS: Diagnosis and treatment"
	//     },
	//     {
	//       "name": "The lowdown on vulva pain"
	//     },
	//     {
	//       "name": "Is your bad PMS actually PMDD?"
	//     }
	//   ]
	// },
	// {
	//   "name": "OB-GYN's choice",
	//   "items": [
	//     {
	//       "name": "How to fight a yeast infection"
	//     },
	//     {
	//       "name": "How to recognize yeast infections"
	//     },
	//     {
	//       "name": "How to clean your vagina",
	//       "classes": "bg-sky-200 hover:bg-sky-300",
	//       "link": guidances('how-to-clean-your-vagina'),
	//     },
	//     {
	//       "name": "Is your bad PMS actually PMDD?"
	//     },
	//     {
	//       "name": "The truth about asexuality"
	//     },
	//     {
	//       "name": "How to boss your OB-GYN appt"
	//     },
	//     {
	//       "name": "light, medium or heavy?"
	//     },
	//     {
	//       "name": "Preparing for menopause in yourself"
	//     },
	//     {
	//       "name": "Should you freeze your eggs?"
	//     }
	//   ]
	// },
	// {
	//   "name": "Recommendations",
	//   "items": [
	//     {
	//       "name": "What causes irregular cycles"
	//     },
	//     {
	//       "name": "Say \"bye bye\" to UTIs"
	//     },
	//     {
	//       "name": "Your discharge decoded"
	//     },
	//     {
	//       "name": "Pregnancy or PMS? 8 Symptoms"
	//     },
	//     {
	//       "name": "Is your sex drive normal?"
	//     },
	//     {
	//       "name": "The secret powers of PMS"
	//     },
	//     {
	//       "name": "How alcohol affects your cycle"
	//     },
	//     {
	//       "name": "7 reasons to love your discharge"
	//     },
	//     {
	//       "name": "Why I'll never shave again"
	//     }
	//   ]
	// }
];
