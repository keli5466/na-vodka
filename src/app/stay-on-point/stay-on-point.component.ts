import { Component, OnInit, Input, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContentService } from '../services/content.service';

@Component({
	selector: 'app-stay-on-point',
	templateUrl: './stay-on-point.component.html',
	styleUrls: ['./stay-on-point.component.styl'],
	providers: [ ContentService ]
})
export class StayOnPointComponent implements OnInit
{
	public email: string;

	constructor( private contentSvc: ContentService )
	{}

	ngOnInit()
	{
	}

	onSubmit()
	{
		if( this.checkForm() )
		{
			console.log( "email sent is: " );
			console.log( this.email );
			this.contentSvc.subscribeToEmailList( this.email ).subscribe();
		}
	}

	// isEmail (STRING s [, BOOLEAN emptyOK])
	// whitespace characters
	private whitespace: string = " \t\n\r";

	//
	// Email address must be of form a@b.c ... in other words:
	// * there must be at least one character before the @
	// * there must be at least one character before and after the .
	// * the characters @ and . are both required
	private isValidEmail(s)
	{
		if (this.isEmpty(s)) return false;

		// is s whitespace?
		if (this.isWhitespace(s)) return false;

		// there must be >= 1 character before @, so we
		// start looking at character position 1
		// (i.e. second character)
		var i = 1;
		var sLength = s.length;

		// look for @
		while ((i < sLength) && (s.charAt(i) != "@"))
		{ i++
		}

		if ((i >= sLength) || (s.charAt(i) != "@")) return false;
		else i += 2;

		// look for .
		while ((i < sLength) && (s.charAt(i) != "."))
		{ i++
		}

		// there must be at least one character after the .
		if ((i >= sLength - 1) || (s.charAt(i) != ".")) return false;
		else return true;
	}

	// Check whether string s is empty.
	private isEmpty(s)
	{
		return ((s == null) || (s.length == 0))
	}

	// Returns true if string s is empty or
	// whitespace characters only.
	private isWhitespace(s)
	{
		var i;

			// Is s empty?
			if (this.isEmpty(s)) return true;

			// Search through string's characters one by one
			// until we find a non-whitespace character.
			// When we do, return false; if we don't, return true.
			for (i = 0; i < s.length; i++)
			{
			// Check that current character isn't whitespace.
			var c = s.charAt(i);

			if (this.whitespace.indexOf(c) == -1) return false;
			}
			// All characters are whitespace.
			return true;
	}

	private checkForm()
	{
		if( !this.isValidEmail( this.email ) )
		{
			alert("Please enter a valid Email Address. (name@host.com)");
			return false;
		}
		else
		{
			return true;
		}
	}
}
