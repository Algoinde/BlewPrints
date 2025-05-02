import { RoomTagEnum } from './room';

export default {
	tags: {
		[RoomTagEnum.Blueprint]: {
			color: '#0093ec'
		},
		[RoomTagEnum.Bedroom]: {
			color: '#9a6fcf'
		},
		[RoomTagEnum.Hallway]: {
			color: '#e78f52'
		},
		[RoomTagEnum.Green]: {
			color: '#52b74f'
		},
		[RoomTagEnum.Shop]: {
			color: '#d2be60'
		},
		[RoomTagEnum.Red]: {
			color: '#c20f00'
		},
		[RoomTagEnum.Addition]: {
			color: '#ffeda3'
		},
		[RoomTagEnum.Found]: {
			color: '#ffeda3'
		},
		[RoomTagEnum.Outer]: {
			color: '#e2e2e2'
		},

		[RoomTagEnum.Blackprint]: {
			color: '#000',
			shadow: 'rgba(255,255,255,0.5)'
		},
		[RoomTagEnum.Puzzle]: {
			color: '#53a8a5'
		},
		[RoomTagEnum.Mechanical]: {
			color: '#e2e2e2'
		},
		[RoomTagEnum.Drafting]: {
			color: '#e2e2e2'
		},
		[RoomTagEnum.Spread]: {
			color: '#e2e2e2'
		},
		[RoomTagEnum.Tomorrow]: {
			color: '#e2e2e2'
		},
		[RoomTagEnum.Entry]: {
			color: '#e2e2e2'
		},

		[RoomTagEnum.Permanent]: {
			color: 'gray'
		},
		[RoomTagEnum.Upgrade]: {
			color: 'gray'
		},
		[RoomTagEnum.Objective]: {
			color: 'gray'
		},

		[RoomTagEnum.DeadEnd]: {
			color: '#6a6e7b'
		},
		[RoomTagEnum.TwoWay]: {
			color: '#6a6e7b'
		},
		[RoomTagEnum.ThreeWay]: {
			color: '#6a6e7b'
		},
		[RoomTagEnum.FourWay]: {
			color: '#6a6e7b'
		},
		[RoomTagEnum.Polymorphic]: {
			color: '#6a6e7b'
		},
		[RoomTagEnum.BackAccess]: {
			color: '#6a6e7b'
		},
		[RoomTagEnum.Right]: {
			color: '#6a6e7b'
		},
		[RoomTagEnum.Left]: {
			color: '#6a6e7b'
		},
		[RoomTagEnum.RightLeft]: {
			color: '#6a6e7b'
		},
		[RoomTagEnum.LeftForward]: {
			color: '#6a6e7b'
		},
		[RoomTagEnum.RightForward]: {
			color: '#6a6e7b'
		},
		[RoomTagEnum.Through]: {
			color: '#6a6e7b'
		},
		[RoomTagEnum.Zone]: {
			color: '#6a6e7b'
		}
	}
} as const;
