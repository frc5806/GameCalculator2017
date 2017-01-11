// whenever a button of class btn-number is clicked
$('.btn-number').click(function(e){
	e.preventDefault();

	fieldName = $(this).attr('data-field');
	type      = $(this).attr('data-type');
	var input = $("input[name='"+fieldName+"']");
	var currentVal = parseInt(input.val());
	if (!isNaN(currentVal)) {
		if(type == 'minus') {

			if(currentVal > input.attr('min')) {
				input.val(currentVal - 1).change();
			}
			if(parseInt(input.val()) == input.attr('min')) {
				$(this).attr('disabled', true);
			}

		} else if(type == 'plus') {

			if(currentVal < input.attr('max')) {
				input.val(currentVal + 1).change();
			}
			if(parseInt(input.val()) == input.attr('max')) {
				$(this).attr('disabled', true);
			}

		}
	} else {
		input.val(0);
	}
});

//handles changing number values in cells by hand
$('.input-number').focusin(function(){
	 $(this).data('oldValue', $(this).val());
});

//handles logic that happens when you try to change the number
$('.input-number').change(function() {

	minValue =  parseInt($(this).attr('min'));
	maxValue =  parseInt($(this).attr('max'));
	valueCurrent = parseInt($(this).val());

	name = $(this).attr('name');

	if(valueCurrent >= minValue) {
		$(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
	} else {
		alert('Sorry, the minimum value is ' + minValue);
		$(this).val($(this).data('oldValue'));
	}
	if(valueCurrent <= maxValue) {
		$(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
	} else {
		alert('Sorry, the maximum value is ' + maxValue);
		$(this).val($(this).data('oldValue'));
	}

	if(name =='lowAuto' || name == 'lowTeleop') {
		var autoFuel = parseInt($("input[name='lowAuto']").val());
		var teleopFuel = parseInt($("input[name='lowTeleop']").val());
		
		if (autoFuel + teleopFuel > parseInt($("input[name='lowAuto']").attr('max'))) {
			$(".btn-number[data-type='plus'][data-field='lowAuto']").attr('disabled', true)
			$(".btn-number[data-type='plus'][data-field='lowTeleop']").attr('disabled', true)
			alert('Sorry, there is a combined maximum of ' + $("input[name='lowAuto']").attr('max') + 
			' fuel for the low boiler in Autonomous and Teleop');
			$(this).val($(this).data('oldValue'));
		}
		else if (autoFuel + teleopFuel == parseInt($("input[name='lowAuto']").attr('max'))) {
			$(".btn-number[data-type='plus'][data-field='lowAuto']").attr('disabled', true)
			$(".btn-number[data-type='plus'][data-field='lowTeleop']").attr('disabled', true)
		}
		else {
			$(".btn-number[data-type='plus'][data-field='lowAuto']").removeAttr('disabled', false)
			$(".btn-number[data-type='plus'][data-field='lowTeleop']").removeAttr('disabled', false)
		}
	}
	
	
	if(name == 'highAuto' || name == 'highTeleop') {
		var autoFuel = parseInt($("input[name='highAuto']").val());
		var teleopFuel = parseInt($("input[name='highTeleop']").val());
		
		if (autoFuel + teleopFuel > parseInt($("input[name='highAuto']").attr('max'))) {
			$(".btn-number[data-type='plus'][data-field='highAuto']").attr('disabled', true);
			$(".btn-number[data-type='plus'][data-field='highTeleop']").attr('disabled', true);
			alert('Sorry, there is a combined maximum of ' + $("input[name='highAuto']").attr('max') + 
			' fuel for the high boiler in Autonomous and Teleop');
			$(this).val($(this).data('oldValue'));
		}
		else if (autoFuel + teleopFuel == parseInt($("input[name='highAuto']").attr('max'))) {
			$(".btn-number[data-type='plus'][data-field='highAuto']").attr('disabled', true)
			$(".btn-number[data-type='plus'][data-field='highTeleop']").attr('disabled', true)
		}
		else {
			$(".btn-number[data-type='plus'][data-field='highAuto']").removeAttr('disabled', false)
			$(".btn-number[data-type='plus'][data-field='highTeleop']").removeAttr('disabled', false)
		}
	}
	
	if(name == 'rotorsAuto' || name == 'rotorsTeleop') {
		var autoRotors = parseInt($("input[name='rotorsAuto']").val());
		var teleopRotors = parseInt($("input[name='rotorsTeleop']").val());
		
		if (autoRotors+ teleopRotors > parseInt($("input[name='rotorsAuto']").attr('max'))) {
			$(".btn-number[data-type='plus'][data-field='rotorsAuto']").attr('disabled', true);
			$(".btn-number[data-type='plus'][data-field='rotorsTeleop']").attr('disabled', true);
			alert('Sorry, there is a combined maximum of ' + $("input[name='rotorsAuto']").attr('max') + 
			' rotors turning in Autonomous and Teleop');
			$(this).val($(this).data('oldValue'));
		}
		else if (autoRotors + teleopRotors == parseInt($("input[name='rotorsAuto']").attr('max'))) {
			$(".btn-number[data-type='plus'][data-field='rotorsAuto']").attr('disabled', true)
			$(".btn-number[data-type='plus'][data-field='rotorsTeleop']").attr('disabled', true)
		}
		else {
			$(".btn-number[data-type='plus'][data-field='rotorsAuto']").removeAttr('disabled', false)
			$(".btn-number[data-type='plus'][data-field='rotorsTeleop']").removeAttr('disabled', false)
		}
	}
});

//handles what happens when you press a key to change the number in a cell (makes sure you enter valid chars)
$(".input-number").keydown(function (e) {
	// Allow: backspace, delete, tab, escape, enter and .
	if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
		 // Allow: Ctrl+A
		(e.keyCode == 65 && e.ctrlKey === true) ||
		 // Allow: home, end, left, right
		(e.keyCode >= 35 && e.keyCode <= 39)) {
			 // let it happen, don't do anything
			 return;
	}
	// Ensure that it is a number and stop the keypress
	if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		e.preventDefault();
	}
});

//handles calculating the numerical point totals at each step and at end
function recalculateSums() {
	var matchResult = $("#matchResult option:selected").text();
	var matchFormat = $("#matchFormat option:selected").text();
	
	var autoTotal = 0;
	var autoPressure = 0;

	var crossBaseline = $('[name="crossBaseline"]').val()*5;
	$("#crossBaseline .taskTotal").text(crossBaseline);
	autoTotal+=crossBaseline;

	var lowAuto = parseInt(Math.floor($('[name="lowAuto"]').val() / 3));
	$("#lowAuto .taskTotal").text(lowAuto);
	autoTotal+=lowAuto;
	autoPressure+=lowAuto;
	
	var lowAutoRemainder = $('[name="lowAuto"]').val() % 3;

	var highAuto = parseInt($('[name="highAuto"]').val());
	$("#highAuto .taskTotal").text(highAuto);
	autoTotal+=highAuto;
	autoPressure+=highAuto;

	var rotorsAuto = $('[name="rotorsAuto"]').val()*60;
	$("#rotorsAuto .taskTotal").text(rotorsAuto);
	autoTotal+=rotorsAuto;

	$("#autoSum").text(parseInt(autoTotal));
	$("#autoPressureSum").text(parseInt(autoPressure));

	var teleopTotal = 0;
	var teleopPressure = 0;

	var lowTeleop = parseInt(Math.floor((parseInt($('[name="lowTeleop"]').val()) + lowAutoRemainder) / 9));
	$("#lowTeleop .taskTotal").text(lowTeleop);
	teleopTotal+=lowTeleop;
	teleopPressure+=lowTeleop;

	var highTeleop = parseInt(Math.floor($('[name="highTeleop"]').val() / 3));
	$("#highTeleop .taskTotal").text(highTeleop);
	teleopTotal+=highTeleop;
	teleopPressure+=highTeleop;

	var rotorsTeleop = $('[name="rotorsTeleop"]').val()*40;
	$("#rotorsTeleop .taskTotal").text(rotorsTeleop);
	teleopTotal+=rotorsTeleop;

	var touchpads = $('[name="touchpads"]').val()*50;
	$("#touchpads .taskTotal").text(touchpads);
	teleopTotal+=touchpads;

	$("#teleopSum").text(parseInt(teleopTotal));
	$("#teleopPressureSum").text(parseInt(teleopPressure));
	
	var matchTotal = parseInt(autoTotal) + parseInt(teleopTotal);
	var rankingTotal = 0;
	
	if((parseInt(autoPressure) + parseInt(teleopPressure)) >= 40) {
		if (matchFormat == "Playoff") {
			matchTotal+=20;
		} 
		else {
			rankingTotal += 1;
		}
	}
	
	if((parseInt($('[name="rotorsAuto"]').val()) + parseInt($('[name="rotorsTeleop"]').val())) == 4) {
		if (matchFormat == "Qualification") {
			rankingTotal += 1;
		}
		else {
			matchTotal += 100;
		}
	}
	
	if(matchFormat == "Qualification") {
		if (matchResult == "Win") {
			rankingTotal += 2;
		} else if (matchResult == "Tie") {
			rankingTotal += 1;
		}
	}

	$("#matchSum").text(matchTotal);
	$("#rankingSum").text(rankingTotal);
}

//handles the order of functions triggered when the webpage loads
$(document).ready(function() {
	recalculateSums();
	$('.container :input').change(function(e) {
		recalculateSums();
	});
})