namespace $.$$ {
	/** Leaderboard entry */
	class $bog_leaderboard_entry extends $giper_baza_dict.with({
		Score: $giper_baza_atom_real,
		Name: $giper_baza_atom_text,
	}) {}

	export class $bog_leaderboard extends $.$bog_leaderboard {
		/** Land link from URL */
		@$mol_mem
		land_link(next?: string | null) {
			return this.$.$mol_state_arg.value('land', next) ?? ''
		}

		/** Shared Land for the leaderboard */
		@$mol_mem
		land() {
			const link = this.land_link()
			if (!link) return null
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(link))
		}

		/** Create a new shared land and put its link in URL */
		@$mol_action
		land_create() {
			const land = this.$.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('just')]])
			this.land_link(land.link().str)
			return land
		}

		/** All entries dict */
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
		board_sorted() {
			const dict = this.entries_dict()
			const keys = dict.keys()

			const entries = keys
				.map(key => {
					const entry = dict.key(key as string)
					return {
						name: entry?.Name()?.val() ?? String(key).slice(0, 8),
						score: entry?.Score()?.val() ?? 0,
					}
				})
				.filter(e => e.score !== 0)

			entries.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))

			return entries
		}

		@$mol_mem
		board_rows() {
			return this.board_sorted().map((entry, index) => {
				const row = $bog_leaderboard_row.make({
					place: () => `#${index + 1}`,
					name: () => entry.name,
					score: () => String(entry.score),
				})
				return row
			})
		}
	}
}
