namespace $.$$ {
	class $bog_leaderboard_entry extends $giper_baza_dict.with({
		Score: $giper_baza_atom_real,
		Name: $giper_baza_atom_text,
	}) {}

	export class $bog_leaderboard extends $.$bog_leaderboard {
		@$mol_mem
		land_link(next?: string | null) {
			return this.$.$mol_state_arg.value('land', next) ?? ''
		}

		@$mol_mem
		land() {
			const link = this.land_link()
			if (!link) return null
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(link))
		}

		@$mol_action
		land_create() {
			const land = this.$.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('slow')]])
			this.land_link(land.link().str)
			return land
		}

		@$mol_mem
		entries_dict() {
			const land = this.land() ?? this.land_create()
			return land.Data($giper_baza_dict_to($bog_leaderboard_entry))
		}

		@$mol_mem
		my_lord_str() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		@$mol_mem
		my_entry() {
			return this.entries_dict().key(this.my_lord_str(), 'auto')!
		}

		@$mol_mem
		my_score(next?: number) {
			if (next !== undefined) {
				const entry = this.my_entry()
				entry.Score(null)!.val(next)
				entry.Name(null)!.val(this.my_lord_str().slice(0, 8))
			}
			return this.my_entry().Score()?.val() ?? 0
		}

		@$mol_mem
		board_keys() {
			const dict = this.entries_dict()
			const keys = dict.keys() as string[]

			return keys
				.filter(key => {
					const entry = dict.key(key)
					return (entry?.Score()?.val() ?? 0) !== 0
				})
				.sort((a, b) => {
					const sa = dict.key(a)?.Score()?.val() ?? 0
					const sb = dict.key(b)?.Score()?.val() ?? 0
					return sb - sa
				})
		}

		@$mol_mem
		board_rows() {
			return this.board_keys().map(key => this.Row(key))
		}

		@$mol_mem_key
		row_place(key: string) {
			return `#${this.board_keys().indexOf(key) + 1}`
		}

		@$mol_mem_key
		row_name(key: string) {
			const entry = this.entries_dict().key(key)
			return entry?.Name()?.val() ?? key.slice(0, 8)
		}

		@$mol_mem_key
		row_score(key: string) {
			const entry = this.entries_dict().key(key)
			return String(entry?.Score()?.val() ?? 0)
		}
	}
}
