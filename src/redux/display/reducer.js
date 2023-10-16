import A from './actions';

const initialState = {
    satmap: false,
    grid: false,
    ranges: true,
    selected_region: 0,
    objectives: {
        total: true,
        towns: true,
        forts: true,
        towers: true,
        safehouses: true,
		techcenters: true,
		seaports: true,
		coastalguns: true,
		stormcannons: true,
		intelcenters: true,
		rtarget: true,
		rcrater: true
    },
    production: {
        total: false,
        constructions: false,
        refineries: false,
        productions: false,
        storages: false,
        armories: false,
        hospitals: false,
        vfactories: false,
        shipyards: false,
        rocketsites: false,
		rprepped: false,
		mpfs: false

    },
    resources: {
        total: false,
        salvage: false,
        components: false,
        sulfur: false,
		coal: false,
        mine_salvage: false,
        mine_components: false,
        mine_sulfur: false,
        mine_oil: false,
		oilrigs: false
    },
    custom: {
        total: true,
        requests: true,
        fobs: true,
        miscicons: true,
        lines: true
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case A.TOGGLE_DISPLAY_CATEGORY: {
            let category = { ...state[action.payload] };
            const setting = category.total;
            for(var i in category) {
                category[i] = !setting
            }
            return {
                ...state,
                [action.payload]: category
            }
        }
        case A.TOGGLE_DISPLAY_ITEM:
            let category = { ...state[action.payload.category] };
            return {
                ...state,
                [action.payload.category]: {
                    ...category,
                    [action.payload.item]: !category[action.payload.item]
                }
            }

        case A.TOGGLE_SAT_MAP: {
            return {
                ...state,
                satmap: !state.satmap
            }
        }

        case A.TOGGLE_GRID: {
            return {
                ...state,
                grid: !state.grid
            }
        }

        case A.TOGGLE_RANGES: {
            return {
                ...state,
                ranges: !state.ranges
            }
        }

        case A.SELECT_REGION: {
            return {
                ...state,
                selected_region: action.payload
            }
        }

    }

    return state;
}
