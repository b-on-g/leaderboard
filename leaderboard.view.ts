namespace $.$$ {

	/** Leaderboard entry in the shared Land */
	class $bog_leaderboard_entry extends $giper_baza_dict.with({
		Score: $giper_baza_atom_real,
		Name: $giper_baza_atom_text,
	}) {}

	export class $bog_leaderboard extends $.$bog_leaderboard {

		/** Home Land of current user */
		@ $mol_mem
		land() {
			return this.$.$giper_baza_glob.home().land()
		}

		/** All entries as dict (lord_str -> entry) */
		@ $mol_mem
		entries_dict() {
			return this.land().Data( $giper_baza_dict_to( $bog_leaderboard_entry ) )
		}

		/** Current player's lord id as string key */
		@ $mol_mem
		my_lord_str() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		/** Current player's entry via dict key */
		@ $mol_mem
		my_entry() {
			return this.entries_dict().key( this.my_lord_str(), 'auto' )!
		}

		@ $mol_mem
		my_score( next?: number ) {

			if( next !== undefined ) {
				const entry = this.my_entry()
				entry.Score( null )!.val( next )
				entry.Name( null )!.val( this.my_lord_str().slice( 0, 8 ) )
			}

			return this.my_entry().Score()?.val() ?? 0
		}

		@ $mol_mem
		board_sorted() {

			const dict = this.entries_dict()
			const keys = dict.keys()

			const entries = keys.map( key => {
				const entry = dict.key( key as string )
				return {
					name: entry?.Name()?.val() ?? String( key ).slice( 0, 8 ),
					score: entry?.Score()?.val() ?? 0,
				}
			} ).filter( e => e.score !== 0 )

			entries.sort( ( a, b ) => ( b.score ?? 0 ) - ( a.score ?? 0 ) )

			return entries
		}

		@ $mol_mem
		board_rows() {
			return this.board_sorted().map( ( entry, index ) => {
				const row = $bog_leaderboard_row.make({
					place: ()=> `#${ index + 1 }`,
					name: ()=> entry.name,
					score: ()=> String( entry.score ),
				})
				return row
			} )
		}

		@ $mol_mem
		auto() {
			this.land().sync()
		}

	}

}
