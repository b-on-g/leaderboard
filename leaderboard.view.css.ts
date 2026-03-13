namespace $.$$ {

	$mol_style_define( $bog_leaderboard, {

		Score_input: {
			maxWidth: '20rem',
		},

	} )

	$mol_style_define( $bog_leaderboard_row, {

		display: 'flex',
		gap: '.5rem',
		padding: {
			top: '.5rem',
			bottom: '.5rem',
			left: '1rem',
			right: '1rem',
		},
		font: {
			size: '1.25rem',
		},

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
