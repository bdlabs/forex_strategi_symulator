import {Component, Directive, HostListener, EventEmitter, ElementRef, OnInit, Output} from 'angular2/core';
import {map, merge} from 'rxjs/Rx';
declare var $:JQueryStatic;

@Directive({
    selector: '[draggable]',
    outputs: ["draggableoutput"]
})
export class Draggable implements OnInit {

    mouseup = new EventEmitter();
    mousedown = new EventEmitter();
    mousemove = new EventEmitter();
    draggableoutput = new EventEmitter();

    @HostListener('document:mouseup', ['$event'])
    onMouseup(event) {
        this.mouseup.emit(event);
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event) {
        this.mousedown.emit(event);
        return false; // Call preventDefault() on the event
    }

    @HostListener('document:mousemove', ['$event'])
    onMousemove(event) {
        this.mousemove.emit(event);
    }

    constructor(public element: ElementRef) {
        this.element.nativeElement.style.position = 'relative';
        this.element.nativeElement.style.cursor = 'pointer';

        this.leftpos = $( this.element.nativeElement ).offset().left;

        map;
        this.mousedrag = this.mousedown.map(event => {
            return {
                //top: event.clientY - this.element.nativeElement.getBoundingClientRect().top
                left: event.clientX - this.element.nativeElement.getBoundingClientRect().left,
            };
        })
        .flatMap(
            imageOffset => this.mousemove.map(pos => ({
                //top: pos.clientY - imageOffset.top,
                left: pos.clientX - imageOffset.left
            }))
            .takeUntil(this.mouseup)
        );
    }

    ngOnInit() {
        let _this = this;
        this.mousedrag.subscribe({
            next: pos => {
                //this.element.nativeElement.style.top = pos.top + 'px';
                this.element.nativeElement.style.left = (pos.left - _this.leftpos) + 'px';
                _this.draggableoutput.next( (pos.left - _this.leftpos) );
            }
        });
    }
}