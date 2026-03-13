namespace $.$$ {

	$mol_style_define( $bog_leaderboard, {

		Score_input: {
			maxWidth: '20rem',
		},

	} )

	$mol_style_define( $bog_leaderboard_row, {

		padding: $mol_gap.block,

		Place: {
			minWidth: '3rem',
			font: {
				weight: 'bold',
			},
		},

		Name: {
			flex: {
				grow: 1,
			},
			color: $mol_theme.shade,
		},

		Score: {
			font: {
				weight: 'bold',
			},
		},

	} )

}
