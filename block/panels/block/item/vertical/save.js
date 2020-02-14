'use strict';

import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const {
		titleTagName,
		title,
		summary,
		linkLabel,
		linkURL,
		linkTarget,
		imageID,
		imageURL,
		imageAlt,
	} = attributes;

	const PanelsItemContent = () => {
		return (
			<>
				{ !! imageID && (
					<div className="smb-panels__item__figure">
						<img
							src={ imageURL }
							alt={ imageAlt }
							className={ `wp-image-${ imageID }` }
						/>
					</div>
				) }

				<div className="smb-panels__item__body">
					{ ! RichText.isEmpty( title ) &&
						'none' !== titleTagName && (
							<RichText.Content
								tagName={ titleTagName }
								className="smb-panels__item__title"
								value={ title }
							/>
						) }

					{ ! RichText.isEmpty( summary ) && (
						<div className="smb-panels__item__content">
							<RichText.Content value={ summary } />
						</div>
					) }

					{ ! RichText.isEmpty( linkLabel ) && (
						<div className="smb-panels__item__action">
							<div className="smb-panels__item__link">
								<RichText.Content value={ linkLabel } />
							</div>
						</div>
					) }
				</div>
			</>
		);
	};

	const classes = classnames( 'c-row__col', className );

	const PanelsItem = () => {
		return ( !! linkURL
			? () => {
					return (
						<a
							className="smb-panels__item"
							href={ linkURL }
							target={
								'_self' === linkTarget ? undefined : linkTarget
							}
							rel={
								'_self' === linkTarget
									? undefined
									: 'noopener noreferrer'
							}
						>
							<PanelsItemContent />
						</a>
					);
			  }
			: () => {
					return (
						<div className="smb-panels__item">
							<PanelsItemContent />
						</div>
					);
			  }
		).call( this );
	};

	return (
		<div className={ classes }>
			<PanelsItem />
		</div>
	);
}
